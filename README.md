# window-center Gnome Extension

This is a very, very, very basic GNOME extension that does one thing:

Resize the currently focused window to ~80% of the screen size and center it.

## Usage

It has one keybinding: `Ctrl+Super+c`.

That centers and resizes current window to roughly 80% of screen size.

## Configure keybinding

That can be changed with 

```
dconf write /org/gnome/shell/extensions/com-thorstenball-windowcenter/center-window "['<Primary><Super>c']"
```
