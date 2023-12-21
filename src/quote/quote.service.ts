import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuoteDocument, Quote } from './schema/quote.schema';
import { Model } from 'mongoose'
import { Cron } from '@nestjs/schedule';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { UserService } from 'src/user/user.service';
import {
  ApiClient,
  TransactionalEmailsApi,
  SendSmtpEmail,
} from '@getbrevo/brevo';

@Injectable()
export class QuoteService implements OnModuleInit {

  private defaultClient = ApiClient.instance;
  private apiInstance = new TransactionalEmailsApi();
  constructor(
    @InjectModel(Quote.name)
    private readonly model: Model<QuoteDocument>,
    private schedulerRegistry: SchedulerRegistry,
    private userService: UserService,
  ){
    this.defaultClient.authentications['api-key'].apiKey ='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'
  }
  async onModuleInit() {
    const tasks = await this.model.find().exec();
    for( let task of tasks){
      await this.addCronJob(task.id, task.frequency, async ()=>{
        await this.sendMail(task);
        console.log(task.id)
      })
    }
  }

  async create(createQuoteDto: CreateQuoteDto) {
    const quote =  await this.model.create(createQuoteDto);
    await this.addCronJob(quote.id, quote.frequency, async ()=>{
      await this.sendMail(quote);
      console.log(quote.id)
    })
    return quote;
  }

  async sendMail(quote){
    var user = await this.userService.findOne(quote.userId)
    var sendSmtpEmail = new SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail = {
      sender:{
        name: "andrea",
        email: "andrea@anhnhung.id.vn",
      },
      to: [{
        email: user.email,
        name: user.username
      }],
      subject:'Your quote of the day',
      htmlContent:`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      
          <style type="text/css">
            a,a[href],a:hover, a:link, a:visited {
              /* This is the link colour */
              text-decoration: none!important;
              color: #0000EE;
            }
            .link {
              text-decoration: underline!important;
            }
            p, p:visited {
              /* Fallback paragraph style */
              font-size:15px;
              line-height:24px;
              font-family:'Helvetica', Arial, sans-serif;
              font-weight:300;
              text-decoration:none;
              color: #000000;
            }
            h1 {
              /* Fallback heading style */
              font-size:22px;
              line-height:24px;
              font-family:'Helvetica', Arial, sans-serif;
              font-weight:normal;
              text-decoration:none;
              color: #000000;
            }
            .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td {line-height: 100%;}
            .ExternalClass {width: 100%;}
          </style>
          <!-- End stylesheet -->
      
      </head>
      
        <body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000" align="center">
        <div style="text-align: center;">
          <table align="center" style="text-align: center; vertical-align: middle; width: 600px; max-width: 600px;" width="600">
            <tbody>
              <tr>
                <td style="width: 596px; vertical-align: middle;" width="596">
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
            <tbody>
              <tr>
                <td style="width: 596px; vertical-align: top; padding-left: 0; padding-right: 0; padding-top: 15px; padding-bottom: 15px;" width="596">
                  <img style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;" alt="Logo" src="https://fullsphere.co.uk/misc/free-template/images/logo-white-background.jpg" align="center" width="180" height="85">
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
              <tbody>
                <tr>
                  <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">
                    <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">Your quote of the day</h1>
                    <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">${quote.content}</p>              
                  </td>
                </tr>
              </tbody>
            </table>
            <img style="width: 600px; max-width: 600px; height: 240px; max-height: 240px; text-align: center;" alt="Image" src="https://fullsphere.co.uk/misc/free-template/images/image-2.jpg" align="center" width="600" height="240">
            <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #000000;" width="600">
              <tbody>
                <tr>
                  <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;" width="596">
                    <img style="width: 180px; max-width: 180px; height: 85px; max-height: 85px; text-align: center; color: #ffffff;" alt="Logo" src="https://fullsphere.co.uk/misc/free-template/images/logo-black-background.jpg" align="center" width="180" height="85">
      
                    <p style="font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
                      Quote Reminder
                    </p>
      
                    <p style="margin-bottom: 0; font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #ffffff;">
                      <a target="_blank" style="text-decoration: underline; color: #ffffff;" href="">
                        anhnhung.id.vn
                      </a>
                    </p>
      
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      
        </body>
      
      </html>`
    };


    this.apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(id: string) {
    return await this.model.findById(id).exec();
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    if(updateQuoteDto.frequency){
      if(this.schedulerRegistry.doesExist("cron", id)){
        this.schedulerRegistry.deleteCronJob(id);
      }
    }
    const ans = await this.model.findByIdAndUpdate(id,updateQuoteDto,{new: true}).exec();
    // const ans = await this.model.findByIdAndUpdate(id,updateQuoteDto).exec();
    await this.addCronJob(id, ans.frequency, async ()=>{
      await this.sendMail(ans);
      console.log(ans.id)
    })
    return ans;
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id).exec();
  }

  addCronJob(name: string, date: string | Date, callback: () => void) {
    if (!this.schedulerRegistry.doesExist('cron', name)) {
      const job = new CronJob(
        date,
        callback,
        null,
        true,
      );
      // const timeout = setInterval(callback, milliseconds);
      this.schedulerRegistry.addCronJob(name, job);
      console.log('added CronJob: ' + name);
    } else {
      throw new BadRequestException('Cronjob exist', {
        cause: new Error(),
        description: 'Bad Request',
      });
    }
  }
}