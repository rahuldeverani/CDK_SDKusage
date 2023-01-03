#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdksdkStack } from '../lib/cdksdk-stack';
const app = new cdk.App();

const AWS = require('aws-sdk');

// set the region to Oregon
AWS.config.update({region:'us-east-1'});

// create EC2 service object
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// get the current Amazon Linux 2 AMIs
const params = {
  Filters: [
    {
      Name: 'name',
      Values: [
        'amzn2-ami-kernel-5.10-hvm-2.0.20221210.1-x86_64-gp2'
      ]
    },
    {
      Name: 'state',
      Values: [
        'available'
      ]
    },
  ],
  Owners: [
    'amazon',
  ]  
 };
const response = ec2.describeImages(params, function(err :any, data :any) {
  if (err) {                     
    //console.log(err, err.stack);  
  } else {       
      
    const imageid= data.Images[0].ImageId
   console.log("out")
    new CdksdkStack(app, 'CdksdkStack', imageid, {

      env: { account: '17xxxx', region: 'us-east-1' },
    
     
    });
          
  }  
});

