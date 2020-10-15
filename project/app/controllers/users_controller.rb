class UsersController < ApplicationController
    
    def index
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user.is_admin
                @users = User.all
                render json: @users, status: :ok
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {error: 'Not authorized'}, status: :unauthorized
        end
    end

    def create
        @new_user = User.new(user_params)
        @new_user.email.downcase!
        @new_user.save
        render json: @new_user, status: :created
    end

    def show
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user.is_admin
                @user = User.where(id: params[:id]).first
                render json: @user, status: :ok
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {error: 'Not authorized'}, status: :unauthorized
        end
    end

    def destroy
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user.is_admin
                @destroy_user = User.where(id: params[:id]).first
                if @destroy_user
                    @destroy_user.destroy
                    render json: {message: 'User was successfully destroyed'}, status: :ok
                else
                    render json: {message: 'User was not found'}, status: :ok
                end
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {error: 'Not authorized'}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation, :is_admin)
    end

end
