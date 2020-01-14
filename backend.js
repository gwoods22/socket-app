const express = require("express")();

// Socket setup
const http = require('http').Server(express);
const io = require('socket.io')(http);

//Home page socket setup
let documents = {};
io.on("connection", socket => {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getDoc", docId => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", doc => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });

  // Basic page socket setup
  let basic = '';
  socket.on("editBasic", doc => {
    basic = doc;
    socket.to('basicSocket').emit("basicEvent", doc);
    console.log(`edit basic to "${doc}"`);
  });

  socket.on("getBasic", () => {
    safeJoin('basicSocket');
    socket.emit("basicEvent", basic);
    console.log(`get "${basic}"`);
  });



  io.emit("documents", Object.keys(documents));
});

http.listen(4444);
