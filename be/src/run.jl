module Run
println("startin import")
using SaunaModel:json_api
println("done importing")
Base.@ccallable function julia_main(ARGS::Vector{String})::Cint
    println(json_api("{}"))
    return 0
end

end