const Subscriber = require('../schema/subscriber-schema')
const ParamValidation = require("../util/ParamValidationUtil")

// get all a user's subscribers
async function getAudiencePageByUserId(userId, pageNum, pageSize) {
    if (ParamValidation.isValidObjectId(userId) === false)
        return null

    return await Subscriber.find({creator_id: userId}, null, {
        sort: {subscription_date: -1},
        skip: pageNum * pageSize,
        limit: pageSize
    })
}

async function getCreatorPageByUserId(userId, pageNum, pageSize) {
    if (ParamValidation.isValidObjectId(userId) === false)
        return null

    return await Subscriber.find({audience_id: userId}, null, {
        sort: {subscription_date: -1},
        skip: pageNum * pageSize,
        limit: pageSize
    })
}

async function updateIsNotification(creatorId, audienceId, notificationSetting) {
    if(ParamValidation.isValidObjectId(audienceId) === false || ParamValidation.isValidObjectId(creatorId) === false)
        return false

    let result = await Subscriber.updateOne({audience_id: audienceId, creator_id: creatorId}, {receive_notification: notificationSetting})
    return result.ok === 1
}

async function subscribeUser(creatorId, audienceId){
    if(ParamValidation.isValidObjectId(audienceId) === false || ParamValidation.isValidObjectId(creatorId) === false)
        return false

    const subscribeRelation = new Subscriber({
        creator_id: creatorId,
        audience_id: audienceId,
        subscription_date: Date.now(),
        receive_notification: true
    })

    let result = await Subscriber.create(subscribeRelation)
    return result !== null
}

async function cancelSubscribeRelation(creatorId, audienceId){
    if(ParamValidation.isValidObjectId(audienceId) === false || ParamValidation.isValidObjectId(creatorId) === false)
        return false

    let result = await Subscriber.deleteOne({creator_id: creatorId, audience_id: audienceId})
    return result.ok === 1
}

async function getSubscription(creatorId, audienceId){
    if(ParamValidation.isValidObjectId(audienceId) === false || ParamValidation.isValidObjectId(creatorId) === false)
        return null

    return await Subscriber.findOne({creator_id: creatorId, audience_id: audienceId})
}

module.exports = {getAudiencePageByUserId, getCreatorPageByUserId, subscribeUser, cancelSubscribeRelation, updateIsNotification, getSubscription}