const { app, BrowserWindow, dialog, ipcMain } = require('electron'),
  path = require('path'),
  server = require('./scripts/server/server');

if(process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    ignored: /WriteWayProjects|[\/\\]\./, argv: []
  })
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

/** CONSTANTS **/
const appIconPath ='./assets/img/logo/logo-original.png',
  loginPath = 'sections/auxWindow/login/login.html',
  registerPath ='sections/auxWindow/register/register.html',
  projectsListPath ='sections/auxWindow/projectsList/projectsList.html',
  editUserPath = 'sections/auxWindow/editUser/editUser.html',
  mainWindowPath ='sections/mainWindow/mainWindow.html',
  pdfWindowPath = 'sections/pdfWindow/pdfWindow.html',
  shareOptionsPath = 'sections/auxWindow/shareOptions/shareOptions.html';

/** VARIABLES **/
let auxWindow,
  mainWindow,
  appIcon = require('electron').nativeImage.createFromPath(appIconPath);

function createAuxWindow (windowPath, args) {

  // Create the browser window.
  auxWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    show: false,
    fullscreenable: false,
    resizable: false
  });

  // and load the index.html of the app.
  auxWindow.loadFile(windowPath, { query: {'data': args} });

  auxWindow.once('ready-to-show', () => {
    auxWindow.show();
  })

  // Open the DevTools.
  // auxWindow.webContents.openDevTools()
}

function createMainWindow (args) {

  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    show: false
  })
  
  mainWindow.loadFile(mainWindowPath, { query: {'data': args} })
  
  mainWindow.once('ready-to-show', () => {
    auxWindow.close()
    mainWindow.show()
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function createPDFWindow (windowPath, args) {

  // Create the browser window.
    pdfWindow = new BrowserWindow({
      width: 500,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
      show: false,
      fullscreenable: false,
      resizable: false
    });
    // and load the index.html of the app.
    pdfWindow.loadFile(windowPath, { query: {'data': args} });

    pdfWindow.once('ready-to-show', () => {
      pdfWindow.show();
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createAuxWindow(loginPath);
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createAuxWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.on('before-quit', e => {
  dialog.showMessageBox( {
    type: 'question',
    title: 'Confirmación',
    message: '¿Estás seguro de que quieres salir de WriteWay?',
    buttons: ['Salir', 'Cancelar'],
    icon: appIcon
  })
  .then( function(result) {
    if(result.response == 1) {
      e.preventDefault()
    }
  })
  
})

// Renderers Communication
ipcMain.on('goto-login', async (e, args) => {
  auxWindow.close();
  createAuxWindow(loginPath, args);
});

ipcMain.on('goBackto-login', async (e, args) => {
  auxWindow.loadFile(loginPath);
});

ipcMain.on('goto-register', async (e, args) => {
  auxWindow.loadFile(registerPath);
});

ipcMain.on('goto-projectsList', async (e, args) => {
  auxWindow.close();
  createAuxWindow(projectsListPath, args);
});

ipcMain.on('goBackto-projectsList', async (e, args) => {
  auxWindow.loadFile(projectsListPath, { query: {'data': args} });
});

ipcMain.on('goto-editUser', async (e, args) => {
  auxWindow.loadFile(editUserPath, { query: {'data': args} });
});

ipcMain.on('open-project', async (e, args) => {
  createMainWindow(args)
});

ipcMain.on('goOutProject', async (e, args) => {
  mainWindow.close();
  createAuxWindow(projectsListPath, args);
});

ipcMain.on('exportChapters', async (e, args) => {
  createPDFWindow(pdfWindowPath, args);
});

ipcMain.on('open-shareOptions', async (e, args) => {
  createAuxWindow(shareOptionsPath, args);
});

ipcMain.on('exportToDocumentsFolder', async (e, args) => {
  e.reply('asynchronous-reply', app.getPath('documents'));
});