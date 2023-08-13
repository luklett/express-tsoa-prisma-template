import server from './app';

const version = 'v0.0.1';

server.listen(8000, () => {
  console.log(
    `> Server listening on ${process.env.SERVER_URL}
                                 __________
                                 [ ${version} ]
                                 ¯¯¯¯¯¯¯¯¯¯`
  );
});
