export const getPosts = async (req, res) => {
  return res.status(200).json({message: 'Viewing GET /posts/'})
}