import React, { useState } from 'react'
import CommentService from '../../services/CommentService'
import CommentPostForm from '../components/general/CommentPostForm'
import Toast from 'react-native-toast-message'

const AddCommentScreen = ({ route,navigation }) => {

    const { item } = route.params;
    const [disabled , setDisabled] = useState(false)

    const addComment = async (content,rating,nameVisible) => {
        setDisabled(true)
        try {
            await CommentService.addComment({
                content,
                rating,
                nameVisible,
                orderItemId: item.orderItem._id,
                productId : item.product._id
            })

            navigation.navigate('MyEvaluations')
        }
        catch (err) {
            Toast.show({
                type: 'customToast',
                position: 'bottom',
                text1: 'İstek iletilirken bir sorun oluştu.Tekrar deneyiniz.',
                visibilityTime: 2000,
                autoHide: true,
                bottomOffset: 0,
            });
            setTimeout(() => {
                setDisabled(false)
            } , 2000);
        }
       
    }

    return (
        <CommentPostForm
            onSubmit={addComment}
            item={item}
            process = "Add"
            disabled = {disabled}
        />
    )
}

export default AddCommentScreen