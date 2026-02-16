/**
 * Netlify Function: Songsterr API Proxy
 * Avoids CORS issues by proxying requests to Songsterr API
 * 
 * Usage: GET /.netlify/functions/songsterr?pattern={searchTerm}
 */

exports.handler = async (event) => {
  try {
    // Get pattern parameter from query string
    const { pattern } = event.queryStringParameters || {};

    // Validate input
    if (!pattern) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Pattern parameter is required' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    // Validate pattern length (prevent abuse)
    if (pattern.length > 100) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Pattern too long (max 100 characters)' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    // Call Songsterr API
    const response = await fetch(
      `https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(pattern)}`
    );

    // Handle Songsterr API errors
    if (!response.ok) {
      console.warn(`Songsterr API error: ${response.status}`);
      return {
        statusCode: 200,
        body: JSON.stringify({ results: [] }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    const data = await response.json();
    const results = Array.isArray(data) ? data : [];

    return {
      statusCode: 200,
      body: JSON.stringify({ results }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    };
  } catch (error) {
    console.error('Songsterr proxy error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch songs from Songsterr' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
