export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const targetUrl = url.startsWith("http") ? url : `https://${url}`;

    const response = await fetch(targetUrl, {
      method: "HEAD",
      redirect: "follow",
    });

    res.status(200).json({
      target: targetUrl,
      statusCode: response.status,
      accessible: response.status >= 200 && response.status < 400,
    });

  } catch (err) {
    res.status(200).json({
      target: url,
      statusCode: null,
      accessible: false,
      error: err.message,
    });
  }
}
