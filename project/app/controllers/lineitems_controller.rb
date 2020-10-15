class LineitemsController < ApplicationController

    def create
        if decode_token
            user_id = decode_token[0]['user_id']
            @user = User.find_by(id: user_id)
            if @user
                @findProduct = Product.find_by(id: lineitem_params[:product_id])
                if @findProduct
                    if @findProduct.user_id == @user.id
                        @lineitem = LineItem.new(lineitem_params)
                        @lineitem.save
                        render json: @lineitem, status: :created
                    else
                        render json: {error: 'Not authorized'}, status: :unauthorized
                    end
                else
                    render json: {error: 'No associated product found'}, status: :not_found
                end
            else
                render json: {error: 'Not authorized'}, status: :unauthorized
            end
        else
            render json: {error: 'Not authorized'}, status: :unauthorized
        end
    end

    private

    def lineitem_params
        params.permit(:name, :description, :product_id)
    end
end
