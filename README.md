jupyter_scisheets_widget
===============================

Incorporating SciSheets into Jupyter

Installation
------------

To install use pip:

    $ pip install jupyter_scisheets_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget


For a development installation (requires npm),

    $ git clone https://github.com/clarka34/jupyter_scisheets_widget.git
    $ cd jupyter_scisheets_widget
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix jupyter_scisheets_widget
    $ jupyter nbextension enable --py --sys-prefix jupyter_scisheets_widget