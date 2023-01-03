import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'


export class CdksdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, Amiid: string, props?: cdk.StackProps) {
    super(scope, id, props);
 
    console.log('in synth')
    console.log(Amiid+"hello")

    const vpc = ec2.Vpc.fromLookup(this , 'vpc',{
      vpcName:'Pika'
    })
    new ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.MEMORY5, ec2.InstanceSize.SMALL),
      machineImage: ec2.MachineImage.genericLinux({["us-east-1"]: Amiid})
    });


  }
}
