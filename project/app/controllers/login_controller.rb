class LoginController < ApplicationController
    
    def index
        @user = User.find_by(email: params[:email])

        if @user && @user.authenticate(params[:password])
            token = JWT.encode({user_id: @user.id}, 's3cr3t')
            render json: {user: @user, token: token}, status: :ok
        else
            render json: {error: 'Invalid Username/Password'}, status: :unauthorized
        end
    end
end
