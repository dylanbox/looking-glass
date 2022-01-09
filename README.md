# Looking Glass

Smart mirror system built on top of [React NodeGUI](https://react.nodegui.org).

Based off of setup from [React NodeGUI Starter](https://github.com/nodegui/react-nodegui-starter)

## Development

### 1.) Required tooling

NodeGui requires CMake and Compilation Tools as it is a wrapper for a native C++ widget toolkit QT.
Detailed instructions here: https://www.sitepoint.com/build-native-desktop-gif-searcher-app-using-nodegui/

TL;DR:

**MacOS**

```
brew install cmake
brew install make
```


**Windows**

https://cmake.org/download/

**Linux (Debian/Ubuntu)**

```
sudo apt-get install pkg-config build-essential
sudo apt-get install cmake make
sudo apt-get install mesa-common-dev libglu1-mesa-dev
```

**Linux (Fedora/RHEL/CentOS)**

```
sudo dnf groupinstall "Development Tools" "Development Libraries"
sudo dnf groupinstall "C Development Tools and Libraries"
sudo dnf install mesa-libGL mesa-libGL-devel
```

### 2.) For all environments:
```
# Install dependencies
npm install

# Run the dev server
npm run dev

# Open another terminal and run the app
npm run start
```
