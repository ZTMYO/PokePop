mod window_manager;

use tauri::Manager;
use tauri::menu::{Menu, MenuItem};
use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};
use std::path::PathBuf;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

fn resolve_image_path(app: &tauri::AppHandle, relative_path: &str) -> Result<PathBuf, String> {
    if let Ok(resource_dir) = app.path().resource_dir() {
        let resource_path = resource_dir.join(&relative_path);
        if resource_path.exists() {
            return Ok(resource_path);
        }
    }

    let dev_path = std::env::current_dir()
        .map_err(|e| e.to_string())?
        .parent()
        .ok_or("cannot find project root")?
        .join("src")
        .join(&relative_path);
    if dev_path.exists() {
        return Ok(dev_path);
    }

    Err(format!("image not found: {}", relative_path))
}

#[tauri::command]
fn get_image_data_url(app: tauri::AppHandle, relative_path: String) -> Result<String, String> {
    let path = resolve_image_path(&app, &relative_path)?;
    let bytes = std::fs::read(&path).map_err(|e| format!("read failed: {}", e))?;
    let b64 = base64::Engine::encode(
        &base64::engine::general_purpose::STANDARD,
        &bytes,
    );
    let ext = path.extension()
        .and_then(|e| e.to_str())
        .unwrap_or("png");
    let mime = match ext.to_lowercase().as_str() {
        "jpg" | "jpeg" => "image/jpeg",
        "gif" => "image/gif",
        "webp" => "image/webp",
        _ => "image/png",
    };
    Ok(format!("data:{};base64,{}", mime, b64))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(|app, shortcut, event| {
                    let target = Shortcut::new(Some(Modifiers::CONTROL | Modifiers::ALT), Code::Digit1);
                    if shortcut != &target || event.state() != ShortcutState::Pressed {
                        return;
                    }
                    let app_handle = app.clone();
                    tauri::async_runtime::spawn(async move {
                        if let Some(window) = app_handle.get_webview_window("main") {
                            match window.is_visible() {
                                Ok(true) => { let _ = window.hide(); }
                                _ => {
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                    window_manager::mark_show().ok();
                                }
                            }
                        }
                    });
                })
                .build(),
        )
        .setup(|app| {
            // Register the shortcut
            let target = Shortcut::new(Some(Modifiers::CONTROL | Modifiers::ALT), Code::Digit1);
            if let Err(e) = app.global_shortcut().register(target) {
                eprintln!("注册快捷键失败: {}", e);
            }

            // Apply acrylic blur effect
            #[cfg(target_os = "windows")]
            {
                if let Some(window) = app.get_webview_window("main") {
                    use windows::Win32::Graphics::Dwm::{
                        DwmSetWindowAttribute, DWM_WINDOW_CORNER_PREFERENCE,
                        DWMWA_WINDOW_CORNER_PREFERENCE, DWMWCP_ROUND,
                    };
                    use windows::Win32::Foundation::HWND;

                    if let Ok(hwnd) = window.hwnd() {
                        let hwnd = HWND(hwnd.0 as _);
                        let _ = window_vibrancy::clear_vibrancy(&window);
                        unsafe {
                            let corner_pref = DWM_WINDOW_CORNER_PREFERENCE(DWMWCP_ROUND.0);
                            let _ = DwmSetWindowAttribute(
                                hwnd,
                                DWMWA_WINDOW_CORNER_PREFERENCE,
                                &corner_pref as *const _ as _,
                                std::mem::size_of::<DWM_WINDOW_CORNER_PREFERENCE>() as u32,
                            );
                        }
                        let _ = window_vibrancy::apply_acrylic(&window, Some((255, 255, 255, 20)));
                        let _ = window.set_shadow(true);
                    }
                }
            }

            // 托盘图标
            {
                let handle = app.handle().clone();

                let show_item = MenuItem::with_id(&handle, "show", "显示 / 隐藏", true, None::<&str>)?;
                let quit_item = MenuItem::with_id(&handle, "quit", "退出", true, None::<&str>)?;
                let tray_menu = Menu::with_items(&handle, &[&show_item, &quit_item])?;

                let tray_icon = handle.default_window_icon().cloned();

                let mut tray_builder = TrayIconBuilder::with_id("tray")
                    .menu(&tray_menu)
                    .show_menu_on_left_click(false)
                    .tooltip("PokePop");
                if let Some(icon) = tray_icon {
                    tray_builder = tray_builder.icon(icon);
                }

                tray_builder
                    .on_menu_event(move |app_handle: &tauri::AppHandle, event: tauri::menu::MenuEvent| {
                        match event.id().as_ref() {
                            "show" => {
                                if let Some(window) = app_handle.get_webview_window("main") {
                                    match window.is_visible() {
                                        Ok(true) => { let _ = window.hide(); }
                                        _ => {
                                            let _ = window.show();
                                            let _ = window.set_focus();
                                        }
                                    }
                                }
                            }
                            "quit" => {
                                app_handle.exit(0);
                            }
                            _ => {}
                        }
                    })
                    .on_tray_icon_event(move |tray: &tauri::tray::TrayIcon, event: TrayIconEvent| {
                        if let TrayIconEvent::Click { button, button_state, .. } = event {
                            if button == MouseButton::Left && button_state == MouseButtonState::Up {
                                let app_handle = tray.app_handle().clone();
                                tauri::async_runtime::spawn(async move {
                                    if let Some(window) = app_handle.get_webview_window("main") {
                                        match window.is_visible() {
                                            Ok(true) => { let _ = window.hide(); }
                                            _ => {
                                                let _ = window.show();
                                                let _ = window.set_focus();
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    })
                    .build(&handle)?;
            }

            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.set_focus();
            }
            Ok(())
        })
        .on_window_event(|window, event| {
            match event {
                tauri::WindowEvent::CloseRequested { api, .. } => {
                    api.prevent_close();
                    let _ = window.hide();
                }
                tauri::WindowEvent::Focused(false) => {
                    if !window_manager::WINDOW_PINNED.load(std::sync::atomic::Ordering::Relaxed)
                        && !window_manager::IGNORE_BLUR.load(std::sync::atomic::Ordering::Relaxed)
                    {
                        let now = std::time::SystemTime::now()
                            .duration_since(std::time::UNIX_EPOCH)
                            .unwrap()
                            .as_millis() as u64;
                        if now.saturating_sub(window_manager::LAST_SHOW_TIMESTAMP.load(std::sync::atomic::Ordering::Relaxed)) < 300 {
                            return;
                        }
                        let w = window.clone();
                        std::thread::spawn(move || {
                            std::thread::sleep(std::time::Duration::from_millis(150));
                            if let Ok(false) = w.is_focused() {
                                let _ = w.hide();
                            }
                        });
                    }
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![
            get_image_data_url,
            window_manager::hide_if_not_pinned,
            window_manager::set_ignore_blur,
            window_manager::set_window_pinned,
            window_manager::mark_show,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
