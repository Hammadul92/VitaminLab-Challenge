class ProductsController < ApplicationController
    def index
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user
                if @user.is_admin
                    @products = Product.all
                else
                    @products = Product.where(user_id: @user.id).all
                end
                render json: @products, status: :ok
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {errorr: 'Not authorized'}, status: :unauthorized
        end
    end

    def create
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user
                @findProduct = Product.find_by(name: product_params[:name])
                if @findProduct
                    render json: {error: 'Product with similar name already exists'}, status: :conflict
                else
                    @product = Product.new(product_params)
                    @product.user_id = @user.id
                    @product.save
                    render json: @product, status: :created
                end
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {error: 'Not authorized'}, status: :unauthorized
        end
    end

    def show
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user
                if @user.is_admin
                    @product = Product.where(id: params[:id]).first
                else
                    @product = Product.where(id: params[:id], user_id: @user.id).first
                end
                if @product
                    @lineitems = LineItem.where(product_id: @product.id).all   
                    @response = {product: @product, lineitems: @lineitems}
                    render json: @response, status: :ok
                else
                    @response = {error: "Product was not found"}
                    render json: @response, status: :not_found
                end
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
            if @user
                if @user.is_admin
                    @product = Product.where(id: params[:id]).first
                else
                    @product = Product.where(id: params[:id], user_id: @user.id).first
                end
                if @product
                    @product.destroy
                    render json: {message: 'Product was successfully destroyed'}, status: :ok
                else
                    render json: {message: 'Product was not found'}, status: :ok
                end
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {error: 'Not authorized'}, status: :unauthorized
        end
    end

    def update
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user
                @product = Product.where(id: params[:id], user_id: @user.id).first
                if @product
                    @findProduct = Product.find_by(name: update_product_params[:name])
                    if @findProduct
                        if @findProduct.id != Integer(params[:id])
                            render json: {error: 'Product with similar name already exists'}, status: :conflict
                        else
                            @product.name = update_product_params[:name]
                            @product.description = update_product_params[:description]
                            @product.price = update_product_params[:price]
                            if update_product_params[:image]
                                @product.image = update_product_params[:image]
                            end
                            @product.save          
                            render json: @product, status: :ok
                        end
                    else
                        @product.name = update_product_params[:name]
                        @product.description = update_product_params[:description]
                        @product.price = update_product_params[:price]
                        if update_product_params[:image]
                            @product.image = update_product_params[:image]
                        end
                        @product.save         
                        render json: @product, status: :ok
                    end
                        

                else
                    render json: {message: 'Product was not found'}, status: :ok
                end
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {error: 'Not authorized'}, status: :unauthorized
        end
    end

    private

    def product_params
        params.permit(:name, :price, :description, :image)
    end

    def update_product_params
        params.permit(:name, :price, :description, :image)
    end

end
