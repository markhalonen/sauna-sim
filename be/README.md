# sauna-sim backend

This backend is a julia server that serves an http api for [SaunaModel.jl](https://github.com/bhalonen/SaunaModel.jl)

## Deployment
- Login to a larger ec2 instance to build the dockerfile.
- Build the Dockerfile `docker build -t be .` 
- Stop the ec2 instance and change to a small instance
- Login again 
- `sudo service docker start`
- `docker run --rm -p 80:80 -e PORT='80' -d be`

The API endpoints are
- https://api.saunasim.com/simulate
- https://api.saunasim.com/params

The user interface is actually dynamically generated from the `/params` endpoint. So this code pattern easily be used in similar applications, but with different simulation inputs. 