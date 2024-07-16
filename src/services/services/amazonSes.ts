import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { fromEnv } from "@aws-sdk/credential-providers";

const EMAIL_FROM = process.env.EMAIL_FROM!;
const AWS_REGION = process.env.AWS_REGION!;

export async function sendEmailService(
  emailTo: string,
  body: string,
  subject: string
) {
  const ses = new SESClient({
    credentials: fromEnv(),
    region: AWS_REGION,
  });

  const sendEmailCommand = createSendEmailCommand(
    [emailTo],
    EMAIL_FROM,
    subject,
    body
  );

  await ses.send(sendEmailCommand);
}

function createSendEmailCommand(
  emailTo: string[],
  source: string,
  subject: string,
  body: string
) {
  const charset = "UTF-8";

  return new SendEmailCommand({
    Destination: {
      ToAddresses: emailTo,
    },
    Source: source,
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Html: {
          Data: body,
          Charset: charset,
        },
      },
    },
  });
}
