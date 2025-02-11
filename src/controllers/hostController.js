export const getAllHosts = async (req, res) => {
  const { name } = req.query;

  try {
    const hosts = await prisma.host.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined, // Case insensitive search for name
      },
    });

    return res.status(200).json(hosts); // Status 200 OK
  } catch (err) {
    console.error("Error in getAllHosts:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
