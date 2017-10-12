Live Playlists
==============

An app to replace the aux cord (kind of).

#### Table of Contents

1. [Contributors](#contributors)
1. [Setting up Environment](#setting-up-environment)
1. [Running this project](#running-this-project)
1. **Bulding and deploying to production**
    - [Tagging Release in GitHub](#tagging-release-in-github)
    - [Building and Deploying Browser-App to Firebase](#building-and-deploying-browser-app-to-firebase)
    - [Building and Deploying iOS-App to the Apple Store](#building-and-deploying-ios-app-to-the-apple-store)
    - [Building and Deploying Android-App to the Google Store](#building-and-deploying-android-app-to-the-google-store)

---
# Contributors

1. [Ryan Trapp](https://github.com/ryantrappy)
1. [Joe Wacker](https://github.com/ryantrappy)
1. [Grayson Odrizzy](https://github.com/ryantrappy)

## Tech Stack
1. Mac
    1. MacOS Sierra (i.e. OS/X 10.12.6)
    1. Xcode 8.3.3 (mac only)
    1. ios-deploy 1.9.1 (mac only)
1. Linux
    1. Linux Mint 18.2 (i.e. Ubuntu 16.04.1, i.e. Debian)
1. Mac+Linux
    1. Java JDK 8
    1. Android Studio 2.3.3
    1. node 6.11.1
    1. npm 5.3.0
    1. bower 1.8.0
    1. ionic 3.7.0
    1. cordova 7.0.1


# Setting up Environment
### Installing `Xcode` _(Mac only)_

Use the Apple Store to download and install Xcode. It is 5+ GB, so be patient. Do not grab the beta, but be sure to use the production version: 8.3.3

This command will verify installation

###### _MAC_
```bash
/usr/bin/xcodebuild -version # should return Xcode 8.3.3
```

### Installing `Java JDK 8` _(required only for Android Studio)_

If you plan to run Android builds you will need the Java JDK 8. If you do not care to do Android builds, Java is unneeded.

###### _MAC_
```bash
brew update  # if you haven't installed HomeBrew yet, see: https://brew.sh/
brew cask install java
echo "export JAVA_HOME=/Library/Java/Home" >> ~/.bash_profile
source ~/.bash_profile
```

###### _LINUX_
```bash
sudo apt-get install openjdk-8-jdk
echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/" >> ~.bashrc
source ~/.bashrc
```

### Installing `Android Studio`

If you do not care to do Android builds, Android Studio is unneeded.

Download and install Android Studio from [developer.android.com](http://developer.android.com/sdk/index.html)

The website provides full installation instructions. The Mac is a straightforward _.dmg_ install, but Linux requires several detailed command lines. On both platforms the first time you run Android Studio it will download and install another gigabyte's worth of SDK related packages. Be patient.

###### _LINUX_
```bash
# unzip studio to the /opt folder
sudo unzip ~/Downloads/android-studio-ide-162.4069837-linux.zip -d /opt
# install needed packages
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
# start android studio's first run, which does further download and installation
/opt/android-studio/bin/studio.sh
```

Also you need to define these environment variables (and add a function to fix misplaced emulator command):

###### _LINUX_
```bash
echo 'export ANDROID_HOME="$HOME/Android/Sdk"' >> ~/.bashrc
echo 'export ANDROID_SDK="$HOME/Android/Sdk"' >> ~/.bashrc
echo 'export PATH="$PATH:$ANDROID_HOME/tools"' >> ~/.bashrc
echo 'export PATH="$PATH:$ANDROID_HOME/tools/bin"' >> ~/.bashrc
echo 'export PATH="$PATH:$ANDROID_HOME/platform-tools"' >> ~/.bashrc
echo 'export PATH="$PATH:/opt/android-studio/gradle/gradle-3.2/bin"' >> ~/.bashrc
echo 'function emulator { cd "$(dirname "$(which emulator)")" && ./emulator "$@"; }' >> ~/.bashrc

source ~/.bashrc
````

###### _MAC_
```bash
echo 'export ANDROID_HOME="$HOME/Library/Android/sdk"' >> ~/.bash_profile
echo 'export ANDROID_SDK="$HOME/Library/Android/sdk"' >> ~/.bash_profile
echo 'export PATH="$PATH:$ANDROID_HOME/tools"' >> ~/.bash_profile
echo 'export PATH="$PATH:$ANDROID_HOME/tools/bin"' >> ~/.bash_profile
echo 'export PATH="$PATH:$ANDROID_HOME/platform-tools"' >> ~/.bash_profile
echo 'export PATH="$PATH:/Applications/Android Studio.app/Contents/gradle/gradle-3.2/bin"' >> ~/.bash_profile
echo 'function emulator { cd "$(dirname "$(which emulator)")" && ./emulator "$@"; }' >> ~/.bash_profile

source ~/.bash_profile
```

#

Check these versions are correct, and accept all licenses

###### _MAC+LINUX_
```bash
gradle -v # should return 3.2
avdmanager -h # should return a help screen
sdkmanager --list | grep emulator # should return 26.1.3
sdkmanager --licenses # answer 'y' to everything
```

### Installing latest `node` and `npm`

From the nodejs website: [Linux](https://nodejs.org/en/download/package-manager), [Mac](https://nodejs.org/en/download/)

###### _LINUX_
```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - # to add the package repository
sudo apt-get install -y nodejs # to install both node and npm
```

###### _MAC_
```bash
cd ~/Downloads
curl -O https://nodejs.org/dist/v6.11.2/node-v6.11.2.pkg
open ./node-v6.11.2.pkg
# finish installation using GUI dialog
```

Use npm to update itself to the latest version

###### _MAC+LINUX_
```bash
npm cache verify # cleans up ~/.npm cache automatically
sudo npm install -g npm
node -v # should return 6.11.1
npm -v # should return 5.3.0
```

### Installing `ios-deploy` _(Mac only)_

###### _MAC_
    sudo npm install -g ios-deploy
    ios-deploy --version # should return 1.9.1

### Installing `bower`

###### _MAC+LINUX_
```bash
sudo npm install -g bower
bower -v # should be 1.8.0
```

### Uninstalling the old `ionic` and `cordova` apps

###### _MAC+LINUX_
```bash
cd; sudo npm uninstall -g ionic cordova
which ionic; which cordova # both should return nothing, if not do a stubborn uninstall
```

#### _Uninstalling stubborn old `ionic` and `cordova`_

If the above `which` command returned a file location, then the uninstall did not work properly. First, open a new terminal window and try again, no kidding. On my Linux system bash had cached the commands, and according to `which` they were still installed despite being removed. If in a new terminal window you still get file locations returned by the `which ionic; which cordova` command, then do this to fully uninstall:

###### _MAC+LINUX_
```bash
cd /usr/local; sudo npm uninstall ionic cordova
cd /usr/local/lib; sudo npm uninstall ionic cordova
cd /usr/local/lib/node_modules; sudo npm uninstall ionic cordova
```

### Installing the latest ionic and cordova

###### _MAC+LINUX_
```bash
cd ~
sudo npm install -g ionic cordova
ionic -v; cordova -v  # should return 3.7.0, 7.0.1 (as of 7/27/2017)
```


---


<!-- ## Using this project -->

<!-- First time installation -->
<!-- ```bash -->
<!-- ./bin/install_script.sh -->
<!-- ``` -->

<!-- If Ionic/Cordova aren't install run this command: -->
<!-- ```bash -->
<!-- npm install -g ionic cordova -->
<!-- ``` -->

<!-- Install npm dependencies: -->

<!-- ```bash -->
<!-- npm install -->
<!-- ``` -->

<!-- Install bower dependencies: -->

<!-- ```bash -->
<!-- bower install -->
<!-- ``` -->


# Running this project

Running in browser mode
```bash
./bin/run_browser.sh
```

Running on iphone-SE (default)
```bash
./bin/emulate_ios.sh
```

Running on different iphone
```bash
cordova emulate ios --list # use one of these, minus the version number, as an emulation target
cordova emulate ios --target="iPhone-SE" # be sure to leave off device version num from the above
```

Running on Android Emulator or device
###### _MAC+LINUX_
```bash
avdmanager list avds | grep Name:
emulator -avd "Nexus_4_API_22" &  # using one of the names listed above
```


# Tagging Release in GitHub

### When a release is ready for production deployment it is essential to tag it with a GitHub release number, to ensure that only the intended codebase is built and deployed. GitHub makes this easy.

Before anything else, follow the preceding instructions for building and testing the app on all three supported platforms Browser, iOS and Android. Once you have successfully built and tested the app, per preceding instructions, you can proceed tag it for release.

First, be sure to update the version number in `config.xml` and `app.js`. This may already be done, but at the least you must double check:

###### _MAC+LINUX_
```bash
cd ~/myBuildDir
cd ./aggressRebuiltClientApp
cd ./aggress-client

vi config.xml # update version in line that reads: <widget id="com.aggress.aggresshealth" version="4.0.0-alpha5"  ...
vi ./www/js/app.js # update versionNumber in line that reads: .value('versionNumber', "4.0.0-alpha5 (9/13/2017)"  ...
```

Finally, ready for tagging

###### _MAC+LINUX_
```bash
cd ~/myBuildDir
cd ./aggressRebuiltClientApp

git tag -a v4.0.0-alpha5 -m "Version: 4.0.0-alpha5 (9/13/2017)" # use correct version, obviously
git push -u origin v4.0.0-alpha5
```

At this point you still need to edit the git tag before GitHub will treat it as an official "release".

Click here https://github.com/abryden/aggressRebuiltClientApp/releases to go to the release page.

You will see the old release at the bottom of the page, and your newly created tag on top. Click the newly created tag.

_Finish this section_

Then go to "Tags"

Then go to "Add Release Notes"

Fill them in, click "Save"

---
# Building and Deploying Browser-App to Firebase
###### MAC/Linux
```bash
./bin/buildAndDeploy.sh
```

---
# Building and Deploying iOS-App to the Apple Store

### _Write This Section_

1. deploy to Apple TestFlight
2. release to production

---
# Building and Deploying Android-App to the Google Store

### _Write This Section_

1. deploy to Android Beta
2. release to production
