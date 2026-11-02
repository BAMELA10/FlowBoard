import { io, server, port } from './app';

io.on("connection", (socket) => console.log("real time connection establish"));
server.listen(port, () => console.log(`The server listenning on port ${port}`));
