const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// AWS S3 configuration
const REGION = 'eu-north-1'; // Update with your desired region
const S3_BUCKET = 'fileuploadreact'; // Update with your S3 bucket name

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAVUGFHU3ID5CHGDA7',
    secretAccessKey: '6KUrP96VV0+JKjJEpJRgiq2jYwZnzrtSUKFJUaEx'
  }
});

const upload = async (req, res) => {
    const formData = req.body;
  console.log(formData);

    try {
      // Upload the 'referrals' file

      const referralsBuffer = Buffer.from(formData.referrals, 'base64');
      console.log(referralsBuffer);
      const referralsParams = {
        Bucket: S3_BUCKET,
        Key: formData.referrals.name,
        Body: referralsBuffer,
      };
      const referralsCommand = new PutObjectCommand(referralsParams);
      const referralsResult = await s3Client.send(referralsCommand);
  
      // Upload the 'collaterals' file
      const collateralsBuffer = Buffer.from(formData.collaterals, 'base64');
      const collateralsParams = {
        Bucket: S3_BUCKET,
        Key: formData.collaterals.name,
        Body: collateralsBuffer,
      };
      const collateralsCommand = new PutObjectCommand(collateralsParams);
      const collateralsResult = await s3Client.send(collateralsCommand);
  
      console.log('Files uploaded to S3:', referralsResult, collateralsResult);
  
      return res.status(200).json({ message: 'Files uploaded successfully' });
    } catch (error) {
      console.error('Error uploading files:', error);
      return res.status(500).json({ error: 'Error uploading files', message:error.message });
    }
  };
  
  module.exports = upload;
