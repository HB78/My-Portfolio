export default function handler(req, res) {
    const { method } = req
    console.log("method", method)

   switch(method) {
    case "GET":
        res.status(200).json("j'ai reussi")
        break;
   }
}