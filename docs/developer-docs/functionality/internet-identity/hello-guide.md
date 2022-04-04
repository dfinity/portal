# Windows Hello Guide for Internet Identity

Internet Identity supports Windows Hello as an authentication method. This guide explains how to set up Windows Hello authentication for an existing Identity Anchor that was set up either on your phone or using a security key. The setup is explained below in Options A and B, respectively.

## Checking if your Windows machine supports Windows Hello

Open your Windows Settings, and select "Accounts"

![settings accounts](../_attachments/settings-accounts.png)

Then select "Sign-in options"

![settings sign in](../_attachments/settings-sign-in.png)

and check your device supports Windows Hello for signing in

![settings hello](../_attachments/settings-hello.png)

If your device supports Windows Hello we can continue. Follow Option A if you’ve set-up an Identity Anchor using your phone or Option B if you’ve used a security key.

## Option A: Adding Windows Hello to an Identity Anchor that uses your phone as authentication method

On your phone go to <https://identity.ic0.app> and log in

![anchor management](../_attachments/anchor-management.png)

Select "Remote Device"

![add remote device](../_attachments/add-remote-device.png)

Now switch to your Windows computer and go to <https://identity.ic0.app> and click on "Already have an Anchor but using a new device?"

![add device start](../_attachments/add-device-start.png)

Enter your Identity Anchor

![add device anchor](../_attachments/add-device-anchor.png)

Enter a name for the Windows device

![enter alias](../_attachments/enter-alias.png)

Complete the Windows Hello dialog by authenticating using Windows Hello

![add device hello](../_attachments/add-device-hello.png)

A verification code will be displayed

![display verification code](../_attachments/display-verification-code.png)

Switch back to your phone and enter the verification code

![enter verification code](../_attachments/enter-verification-code.png)

After verifying the Windows computer on your phone you should be able to authenticate on your Windows machine using Windows Hello

![login hello](../_attachments/login-hello.png)

## Option B: Adding Windows Hello to an Identity Anchor that uses your security key as authentication method

On your Windows computer go to <https://identity.ic0.app> and authenticate using your security key to reach the Anchor Management page. Once you’re there click on "+ ADD NEW DEVICE".

![anchor management](../_attachments/anchor-management.png)

Select "Local Device"

![add local device](../_attachments/add-local-device.png)

Complete the Windows Hello dialog

![management add device dialog](../_attachments/management-add-device-dialog.png)

and choose a name for your Windows machine

![management add device name](../_attachments/management-add-device-name.png)

If you refresh the page, you should now be able to authenticate with Windows Hello

![login hello](../_attachments/login-hello.png)
