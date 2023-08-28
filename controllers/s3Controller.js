const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');


// AWS S3 configuration
const REGION = 'eu-north-1'; // Update with your desired region
const S3_BUCKET = 'fileuploadbucketreact'; // Update with your S3 bucket name

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAXRBQMHS67P7N7LFZ',
    secretAccessKey: 'cHKC7GJmQGaAeeAigPOetNfjWSsTO9t+VZSjYslA'
  }
});

// Endpoint to handle file uploads
const upload = async (req, res) => {
    const requestData = req.body;
  console.log(requestData)

    try {
      // Upload the 'referrals' file
      const referralsBuffer = Buffer.from(requestData.referrals, 'base64');
      console.log(referralsBuffer)
      const referralsParams = {
        Bucket: S3_BUCKET,
        Key: requestData.referrals.name,
        Body: referralsBuffer,
      };
      const referralsCommand = new PutObjectCommand(referralsParams);
      const referralsResult = await s3Client.send(referralsCommand);
  
      // Upload the 'collaterals' file
      const collateralsBuffer = Buffer.from(requestData.collaterals, 'base64');
      const collateralsParams = {
        Bucket: S3_BUCKET,
        Key: requestData.collaterals.name,
        Body: collateralsBuffer,
      };
      const collateralsCommand = new PutObjectCommand(collateralsParams);
      const collateralsResult = await s3Client.send(collateralsCommand);
  
      console.log('Files uploaded to S3:', referralsResult, collateralsResult);
  
      return res.status(200).json({ message: 'Files uploaded successfully' });
    } catch (error) {
      console.error('Error uploading files:', error);
      return res.status(500).json({ error: 'Error uploading files' });
    }
  };
  
  module.exports = upload;