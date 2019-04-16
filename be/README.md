# sauna-sim backend

This backend is a julia server that serves an http api for [SaunaModel.jl](https://github.com/bhalonen/SaunaModel.jl)

## Deployment
- Login to ec2
- `sudo service docker start`
- Build the Dockerfile `docker build -t be .` 
- Stop the running server `docker ps` and then `docker kill PID`
- `docker run --rm -p 80:80 -e PORT='80' -d be`
- This may take a few minutes to get up and running, and then the first request will be slow, but then subsequent requests will be blazing fast.

The API endpoints are
- https://api.saunasim.com/simulate - Runs the simulation
- https://api.saunasim.com/params - Tells the UI what inputs can be changed for the simulation