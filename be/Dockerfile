FROM julia:1.1

ADD /src /be/src/
ADD *.toml /be/
WORKDIR /be

RUN julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/bhalonen/SaunaModel.jl"))'
RUN julia -e 'using Pkg; Pkg.add(Pkg.PackageSpec(url="https://github.com/amellnik/Joseki.jl"))'
RUN julia -e 'using Pkg; Pkg.add("JSON")'
RUN julia -e 'using Pkg; Pkg.add("HTTP")'

RUN apt-get update; apt-get install -y build-essential make gcc
RUN julia -e 'using Pkg; Pkg.add("PackageCompiler")'
RUN julia -e 'using SaunaModel;'
RUN julia -e 'using PackageCompiler; PackageCompiler.build_executable("src/server.jl", "server")'

CMD ./builddir/server