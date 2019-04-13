FROM julia:1.1

ADD /src /be/src/
ADD *.toml /be/
WORKDIR /be

RUN julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/bhalonen/SaunaModel.jl"))'
RUN julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/amellnik/Joseki.jl"))'
RUN julia -e 'using Pkg; Pkg.add("JSON")'
RUN julia -e 'using Pkg; Pkg.add("HTTP")'

CMD export JULIA_DEPOT_PATH="/root/.julia/" && julia -e 'include("src/server.jl")'