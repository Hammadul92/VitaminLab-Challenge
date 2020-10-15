class ApplicationController < ActionController::Base
    
    skip_before_action :verify_authenticity_token
    def decode_token
        auth_header = request.headers['Authorization']
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, 's3cr3t', true)
            rescue JWT::DecodeError
                nil
            end
        end
    end
end
