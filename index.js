const AWS = require("aws-sdk")

const TABLE_NAME = process.env.TABLE_NAME
const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-west-2",
})

exports.handler = async (event) => {
    console.log(`event`, JSON.stringify(event))
    console.log(`event.Details.ContactData.CustomerEndpoint.Address ${event.Details.ContactData.CustomerEndpoint.Address}`)
    console.log(`event.Details.ContactData.SystemEndpoint.Address ${event.Details.ContactData.SystemEndpoint.Address}`)
    var phoneNumber = event.Details.ContactData.CustomerEndpoint.Address
    const result = await getCustomerInfo(phoneNumber)
    console.log(`result `, JSON.stringify(result))
    var response = { infoFound: false }
    if (result != undefined) {
        response = {
            infoFound: true,
            lastName: result.lastName,
            firstName: result.firstName,
            cityName: result.cityName
            
        }
    }
    return response;
};

async function getCustomerInfo(phoneNumber) {

    const res = await documentClient
        .get({
            "TableName": TABLE_NAME,
            Key: {
                "phone_number": phoneNumber
            },
        })
        .promise()
    return res.Item

}
