FROM julia:1.1

RUN apt-get update; apt-get install -y build-essential make gcc 

ADD /src /be/src/

WORKDIR /be

ENV JULIA_CPU_TARGET x86-64

RUN julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/bhalonen/SaunaModel.jl"))'
RUN julia -e 'using Pkg; Pkg.add("PackageCompiler");'
RUN julia -e 'using SaunaModel;'
RUN julia -e 'using PackageCompiler;build_executable("src/run.jl", "run")'

CMD EXPORT JULIA_CPU_TARGET=x86-64 && ./builddir/run


# RUN JULIA_DEPOT_PATH=/opt/julia-1.0/.julia julia -e 'using Pkg; pkg"activate ."; pkg"instantiate"'
# RUN JULIA_DEPOT_PATH=/opt/julia-1.0/.julia julia -e 'using PackageCompiler;build_executable("src/server.jl", "server")'



# Install dependencies
# RUN julia -e 'using Pkg; Pkg.activate(".")'


# RUN julia -e 'using Pkg; Pkg.instantiate()'

# RUN julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/amellnik/Joseki.jl"))'
# RUN julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/bhalonen/SaunaModel.jl"))'


# RUN JULIA_DEPOT_PATH=/opt/julia-1.0/.julia julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/bhalonen/SaunaModel.jl"))'
# RUN JULIA_DEPOT_PATH=/opt/julia-1.0/.julia julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/amellnik/Joseki.jl"))'
# RUN JULIA_DEPOT_PATH=/opt/julia-1.0/.julia julia -e 'using Pkg; Pkg.add("JSON")'
# RUN JULIA_DEPOT_PATH=/opt/julia-1.0/.julia julia -e 'using Pkg; Pkg.add("HTTP")'
# RUN JULIA_DEPOT_PATH=/opt/julia-1.0/.julia julia -e 'using SaunaModel, Joseki, JSON, HTTP'
# RUN julia -e 'using Pkg; Pkg.add("PackageCompiler");'
# RUN julia -e 'using PackageCompiler;build_executable("src/server.jl", "server")'

# RUN julia --project -e 'using SaunaModel:json_api; json_api("{}")'


# CMD export JULIA_DEPOT_PATH="/root/.julia/" && julia -e 'include("src/server.jl")'



# RUN julia --project=/be/ -e 'using Pkg; pkg"activate ."; pkg"instantiate"; pkg"precompile"'
# CMD julia --project=/be/ -e 'using Pkg; pkg"activate ."; include("src/server.jl")'
