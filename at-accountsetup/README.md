# Setting up your Account with Africa's Talking :sunglasses:

Welcome! This will be (hopefully :sweat_smile:) great experience that will kick-start your API journey or keep your dev psych blazing :fire:.

:star: Key items of these instructions:
- *Step-by-step* guide on setting up your account (with pictorial illustrations :100:)
- Key aspects to take note of on the *App Dashboard*

## Step-by-step guide:

1. Visit the Africa's Talking website [here](https://africastalking.com) and navigate to the **top right** section to log in as shown in the image below. 

![Africa's Talking Website](/at-accountsetup/at-imagesfolder/at-website.png)

2. To create an account, click on the *Register* link shown on the Log in page as shown in the image below.

![Africa's Talking Website Register](/at-accountsetup/at-imagesfolder/at-login.png)

3. Sign up with your details on the page shown. 
4. Log in to your account. Successful logging in leads you to a page with a pop-up onboarding survey. Kindly fill that in, it takes less than a minute :blush:. The survey is one such as the one shown below:

![Africa's Talking Account Survey](/at-accountsetup/at-imagesfolder/at-survey.png)

5. After the survey, you land on the *account dashboard*, similar to that shown in the image below:

![Africa's Talking Account Dashboard](/at-accountsetup/at-imagesfolder/at-verifyemail.png)

On the page, there is a prompt to check your email for a __*verification email*__. (This is the point where you switch to your email and verify your account. Don't worry, no rush, I'll wait :relieved:). 
---
Verified? Awesome! :grin: Time to proceed now...

6. On successful verification, your dashboard unlocks a new feature that enables you to create a __*team*__. (This is the starting point for consuming our APIs when creating applications.) Click on the *New Team* button on the account button as shown in the image below:

![Africa's Talking Account: New Team](/at-accountsetup/at-imagesfolder/at-newteam.png)

NOTE: To learn more about *teams, members* and *apps*, find details in the [AT-TeamStructure folder](/at-accountsetup/at-teamstructure/). 

7. When you click on the *New Team* button, you get prompted to give your team a name. (Don't worry, any name works fine :sweat_smile:). After successful creation, you can then view your team on the dashboard as shown in the image below:

![Africa's Talking Account: Team Created](/at-accountsetup/at-imagesfolder/at-newteamcreated.png)

Click on your created team's name.

8. After clicking on the team name, you land on the **Team dashboard** as shown in the image below:

![Africa's Talking Account: Team Dashboard](/at-accountsetup/at-imagesfolder/at-teamdashboard.png)

This enables you to add members and apps to your team. (Refer [here](/at-accountsetup/at-teamstructure/) for details on members and apps) Feel free to add on members, but the apps are what will be key in consumption of APIs. So let us proceed with that...

9. Click on the *Create App* button to create a new app. The form that pops up is as shown below:

![Africa's Talking New App](/at-accountsetup/at-imagesfolder/at-newapp.png)

The name can be *anything you wish*. However, the __*username*__ should be as **unique as possible**. Wonder why :thought_balloon:? **(Put a star on this, you'll see it once we get to the __*App Dashboard*__)**

Once saved, the app is added to your apps list as shown in the image below:

![Africa's Talking New App Created](/at-accountsetup/at-imagesfolder/at-appcreated.png)

10. Click on your app name to progress to the **App Dashboard**. The dashboard should look as shown in the image: 

![Africa's Talking App Dashboard](/at-accountsetup/at-imagesfolder/at-appdashboard.png)

NOTE: The dashboard for a *new* account has some unique elements. These are:

- **Pre-topped up account**: The account has Ksh. 10.00 (Kenya) already loaded to your account for tests.
- **No data on the landing page**: This is because the account has not been used to consume any APIs yet, hence, no data to display yet.

On the landing page, the main elements to take note of are:

a. The **account balance** is visible on your *top left*.

b. Your **username** is located right at the top.

c. The **left side-bar** has dropdowns for all the products for further details and charts.

## Key Aspects

1. Accessing your **API Key**

Navigate to the last item of the sidebar on the left, *Settings*, and select the *API Key* option from the dropdown. This leads to a page with a password input field as shown in the image below:

![Africa's Talking API Key](/at-accountsetup/at-imagesfolder/at-apikey.png)

Your API Key is a fundamental part of your code, and is in the form of a long string of letters and numbers. Hence, once generated, *store it in a place where you can refer from*. The key is generated after you key in your password in the input field and click on the *Generate* button. 

NOTE: Each time you generate a new API Key, all other previously generated API Keys are rendered *obsolete* and yield *Authentication Errors* when used in code. 

2. **Top-up Processes**

Navigate to the *Billing* item of the sidebar on the left, and select the *Payment Methods* option from the dropdown. This leads to a page with payment method options based on your country as shown in the image below:

![Africa's Talking Top-up](/at-accountsetup/at-imagesfolder/at-topup.png)

Top-up instructions are shown per option, and on top-up it reflects on your account *automatically* as will be visible on the **Balance** button on the *top left*. 

3. Accessing **Developer Documentation**

Navigate to the *Docs* icon at the top right section of the navbar to access Developer Documentation. **This is a very key part of the Africa's Talking website.**

Find more details and tips on the Africa's Talking Developers' Portal in [this folder](/at-developerdocs/).

4. Setting **Callback URLs**

Navigate to a particular product, e.g. *SMS* from the sidebar, then navigate to the final item in the dropdown, *SMS Callback URLs*. Select the callback you would want to set and insert the URL in the text input field then click on *Submit* to set it. The interface will be displayed as shown below:

![Africa's Talking Callback URL](/at-accountsetup/at-imagesfolder/at-callbackurl.png)

NOTE: Further details on **how to set up a callback URL using [Ngrok](https://ngrok.com/) and sending and receiving requests via [Postman](https://www.postman.com/)** is shown in :pencil:[this article](https://medium.com/africas-talking/how-to-send-data-and-receive-reports-using-africas-talking-apis-512720fe4d80).

With that, you're set up! Ready to consume APIs and build scalable solutions for the win! :muscle:


Wait, before I forget... 

**Remember we had a unique username and were to find out why?**

1. Your **username** is used as an authentication element, together with your API Key. Hence, should be unique.
2. When topping-up, your **username** identifies your account, which is automatically updated with the amount.

That being said (written :smile:), happy coding! :)