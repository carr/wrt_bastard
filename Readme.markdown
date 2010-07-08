WRT Bastard
===========

WRT Bastard is a library that simplifies development of Nokia WRT mobile applications.

Install
=======

To install WRT Bastard as a submodule to an existing git source code repository:

    git submodule add git://github.com/carr/wrt_bastard.git wrt_bastard
    
Or, if you have write access:

    git submodule add git@github.com:carr/wrt_bastard.git wrt_bastard

If your cloning the project containing WRT Bastard, you need to initialize the submodule and set it to a master branch.
    
    git clone some_project.git
    cd some_project
    git submodule init
    git submodule update
    cd wrt_bastard
    git checkout master

If you want to get new changes for WRT Bastard
    cd wrt_bastard
    git pull

Tips
====

For debugging purposes in Firefox, you need to enable cross site scripting. This requires setting 
<tt>signed.applets.codebase_principal_support</tt> to true in <tt>about:config</tt>


Author
======

Copyright © 2010 Tomislav Car, Josip Bišćan (Infinum)