/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const { Meta, Shell } = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;

class Extension {
    constructor() {
    }

    centerWindow() {
      global.get_window_actors().every((w) => {
        if (w.meta_window.has_focus()) {
          var monitorGeometry = Meta.is_wayland_compositor()
            ? global.workspace_manager
            .get_active_workspace()
            .get_work_area_for_monitor(w.meta_window.get_monitor().index)
            : global.display.get_monitor_geometry(w.meta_window.get_monitor());

          var monitorUpperLeftX = monitorGeometry.x;
          var monitorUpperLeftY = monitorGeometry.y;
          var widthUnit = Math.floor(monitorGeometry.width / 12);
          var heightUnit = Math.floor(monitorGeometry.height / 12);

          var newWidth = widthUnit*10;
          var newHeight = heightUnit*10;

          if (w.meta_window.get_maximized()) {
            w.meta_window.unmaximize(3); // META_MAXIMIZE_BOTH
          }

          w.meta_window.move_resize_frame(
            0,
            monitorUpperLeftX + widthUnit,
            monitorUpperLeftY + heightUnit,
            newWidth,
            newHeight,
          );
          return false;
        }

        return true;
      });
    }

    enable() {
      let settings = ExtensionUtils.getSettings("org.gnome.shell.extensions.com-thorstenball-windowcenter");

      let mode = Shell.ActionMode.NORMAL;
      let flag = Meta.KeyBindingFlags.NONE;

      Main.wm.addKeybinding("center-window", settings, flag, mode, this.centerWindow);
    }

    disable() {
      Main.wm.removeKeybinding("center-window");
    }
}

function init() {
    return new Extension();
}
