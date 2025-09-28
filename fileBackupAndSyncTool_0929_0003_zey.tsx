// 代码生成时间: 2025-09-29 00:03:15
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, Button, Typography, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'firebase/firestore';
import firebase from 'firebase/app';

// 配置主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
  },
});

// 定义文件备份和同步组件
const FileBackupAndSyncTool: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [backupStatus, setBackupStatus] = useState<'' | 'success' | 'error'>(''');
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [firebaseConfig, setFirebaseConfig] = useState<any>({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  });

  // 使用useEffect来初始化Firebase
  useEffect(() => {
    const config = {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_AUTH_DOMAIN',
      projectId: 'YOUR_PROJECT_ID',
      storageBucket: 'YOUR_STORAGE_BUCKET',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID',
    };
    firebase.initializeApp(config);
    setFirebaseConfig(config);
  }, []);

  // 处理文件拖放事件
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  // 上传文件到Firebase Storage
  const uploadFilesToFirebase = async () => {
    setUploading(true);
    try {
      for (const file of files) {
        const fileRef = firebase.storage().ref(file.name);
        await fileRef.put(file);
      }
      setBackupStatus('success');
    } catch (error) {
      setBackupStatus('error');
    } finally {
      setUploading(false);
    }
  };

  // 从Firebase Storage下载文件
  const downloadFilesFromFirebase = async () => {
    setDownloading(true);
    try {
      for (const file of files) {
        const fileRef = firebase.storage().ref(file.name);
        const downloadURL = await fileRef.getDownloadURL();
        const link = document.createElement('a');
        link.href = downloadURL;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      setBackupStatus('error');
    } finally {
      setDownloading(false);
    }
  };

  // 渲染文件拖放区域
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/octet-stream',
    onDrop,
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} direction='column' alignItems='center'>
        <Grid item>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography variant='h4'>拖放文件到此处</Typography>
          </div>
        </Grid>
        <Grid item>
          {files.length > 0 && (
            <Button
              variant='contained'
              color='primary'
              onClick={uploadFilesToFirebase}
              disabled={uploading || files.length === 0}
            >
              上传文件到Firebase
            </Button>
          )}
        </Grid>
        <Grid item>
          {files.length > 0 && (
            <Button
              variant='contained'
              color='primary'
              onClick={downloadFilesFromFirebase}
              disabled={downloading || files.length === 0}
            >
              从Firebase下载文件
            </Button>
          )}
        </Grid>
        <Grid item>
          {backupStatus === 'success' && (
            <Snackbar open>
              <Alert severity='success'>文件备份和同步成功</Alert>
            </Snackbar>
          )}
          {backupStatus === 'error' && (
            <Snackbar open>
              <Alert severity='error'>文件备份和同步失败</Alert>
            </Snackbar>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FileBackupAndSyncTool;