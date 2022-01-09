# Looking Glass

![ci workflow](https://github.com/dylanbox/looking-glass/actions/workflows/main.yml/badge.svg)

Smart mirror system built on top of [React NodeGUI](https://react.nodegui.org).

## Development

1. Install required OS tooling

    NodeGui requires CMake and Compilation Tools as it is a wrapper for a native C++ widget toolkit QT.
    Detailed instructions here: https://www.sitepoint.com/build-native-desktop-gif-searcher-app-using-nodegui/

    TL;DR:

    **MacOS**

    ```
    brew install cmake
    brew install make
    ```

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

2. Install and build node packages:
    ```
    # Install dependencies
    npm install

    # Run the dev server
    npm run dev

    # Open another terminal and run the app
    npm run start
    ```


## Packaging
*Note: Currently MacOS builds are not signed, which will cause MacOS to throw a securtiy warning when attemping to run the package.*

1. Init the nodegui packer library
    ```
    npx nodegui-packer --init LookingGlass
    ```

2. Build the package
    ```
    npm run build
    ```


