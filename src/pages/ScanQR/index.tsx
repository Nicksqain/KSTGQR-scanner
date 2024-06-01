import { FC, useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import tg from '../../functions/tg';

interface ScanQRProps {

}

const ScanQR: FC<ScanQRProps> = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const scanQrbuttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    tg.MainButton.offClick(() => { })
  }, [])

  const handleClearQrForm = () => {
    setQrCode(null)
  }

  useEffect(() => {
    const handleStartScanning = () => {
      startScanning();
    };
    const timerId = setTimeout(handleStartScanning, 0);
    return () => {
      clearTimeout(timerId);
    };
  }, []);


  // TODO: 
  // useEffect(() => {
  //   if (qrCode) {
  //     tg.MainButton.show();
  //     tg.MainButton.setText('Отправить');
  //   }
  //   else {
  //     tg.MainButton.hide();
  //   }
  // }, [qrCode]);

  const startScanning = async () => {
    try {
      // Открываем окно сканирования QR-кода
      tg.showScanQrPopup({ text: "Сканировать qr" }, handleQrCodeTextReceived);
    } catch (error) {
      console.error('Произошла ошибка при открытии QR-сканера:', error);
    }
  };
  const handleButtonClick = useCallback(() => {
    handleClearQrForm()
    startScanning();
  }, []);

  const handleQrCodeTextReceived = (qrText: string): void => {
    try {
      tg.sendData(qrText)
      toast.success(`Отправлено: ${qrText}`);
      setQrCode(String(qrText));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Произошла ошибка:', error);
      toast.error(`Произошла ошибка: ${error.message}`);
    } finally {
      // Закрываем всплывающее окно
      try {
        tg.closeScanQrPopup();
      } catch (error) {
        console.error('Произошла ошибка при закрытии QR-сканера:', error);
      }
    }
  };

  useEffect(() => {
    // tg.MainButton.hide();
    tg.closeScanQrPopup();

    return () => {

    };
  }, [handleButtonClick]);

  return (
    <div>
      <div className='scan-qr' style={{ padding: 15 }}>
        {qrCode ?
          <>
            <p>Полученный QR-код: {qrCode}</p>
            <button ref={scanQrbuttonRef} onClick={handleButtonClick}>Сканировать новый QR</button>
          </>
          : <>
            <p>Отсканируйте QR клиента</p>
            <button ref={scanQrbuttonRef} onClick={handleButtonClick}>Сканировать QR</button>
          </>}
      </div>
    </div>
  )
}

export default ScanQR;