
import React, { createContext, useState, useCallback, useEffect, PropsWithChildren } from 'react';
import { Alert } from './Alert';

type AlertContextType = {
	showAlert: (params: { message: string, title?: string }) => void;
};

export const AlertContext = createContext<AlertContextType>({
	showAlert: () => {},
});

export function AlertProvider({ children }: PropsWithChildren<{}>) {
	const [alertVisible, setAlertVisible] = useState(false);
	const [title, setTitle] = useState<string | undefined>();
	const [message, setMessage] = useState<string | undefined>();

	const showAlert = useCallback(({title, message}: { title?: string, message: string }) => {
		setAlertVisible(true);
		setTitle(title);
		setMessage(message);
	}, []);

	const hideAlert = useCallback(() => {
		setAlertVisible(false);
		setTitle(undefined);
		setMessage(undefined);
	}, [])

	useEffect(() => {
		let timer: NodeJS.Timeout;
    if (alertVisible) {
      timer = setTimeout(() => hideAlert(), 10000);
    }
    return () => clearTimeout(timer);
	}, [alertVisible, hideAlert]);

	return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {message && (
        <div className="fixed bottom-4 flex flex-col items-center w-full">
          <Alert title={title} text={message} />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
	const context = React.useContext(AlertContext);

	if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

	return context;
};
