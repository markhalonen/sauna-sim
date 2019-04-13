using Joseki
using JSON
using HTTP
import HTTP.IOExtras.bytes
println("Starting sauna import")
using SaunaModel:dictionary_api
using SaunaModel:get_default_scenario_json
println("SaunaModel imported!")
### Create some endpoints

function dotNotationToDict(params::Dict)
    result = Dict()
    for (key, value) in params
        # key: sauna.stove.mass
        split_keys = split(key, ".")
        current_dict = result
        for key_idx in 1:length(split_keys)
            sub_key = split_keys[key_idx]
            if key_idx == length(split_keys)
                current_dict[sub_key] = parse(Float64, value)
            elseif !haskey(current_dict, sub_key) 
                current_dict[sub_key] = Dict()
                current_dict = current_dict[sub_key]
            else 
                current_dict = current_dict[sub_key]
            end
            
        end
    end
    return result
end

function simulate(req::HTTP.Request)
    params = HTTP.queryparams(HTTP.URI(req.target))
    # params = Dict(String -> String)
    dict_format = dotNotationToDict(params)
    b = JSON.json(dictionary_api(dict_format))
    req.response.body = bytes(b)
    return req.response
end

function params(req::HTTP.Request)
    b = get_default_scenario_json()
    req.response.body = bytes(b)
    return req.response
end

### Create and run the server

# Make a router and add routes for our endpoints.
endpoints = [
    (simulate, "GET", "/simulate"),
    (params, "GET", "/params")
]
r = Joseki.router(endpoints)

# If there is a PORT environment variable defined us it, otherwise use 8000
haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8000
# Fire up the server, binding to all ips

HTTP.serve(r, "0.0.0.0", port; verbose=false)