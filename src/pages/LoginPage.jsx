import { useState } from "react"
import { message, Modal, Input } from 'antd';
import withHocBase from "../hocs/withHocBase";
import path from "../utils/paths";
import { ButtonBase } from "../components/index";
import { useLogin } from "../hooks/auth/useLogin";
import { useResetPassword } from "../hooks/auth/useResetPassword";

const LoginPage = ({navigate}) => {

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailResetPassword, setEmailResetPassword] = useState('')
  const [dataLogin, setDataLogin] = useState({
    userName: "",
    password: ""
  })

  const { mutate: $login, isPending: isPendingLogin } = useLogin();
  const { mutate: $resetPassword } = useResetPassword();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {

    try {
      $resetPassword({ email: emailResetPassword }, {
        onSuccess: () => {
          messageApi.open({
            type: 'success',
            content: 'Reset Password Success !',
          });
        },
        onError: () => {
          messageApi.open({
            type: 'error',
            content: 'Reset Password Failure !',
          });
        },
        onSettled: () => {
          setEmailResetPassword('')
        }
      })
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Reset Password Failure !',
      });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleLoginForm = async () => {
    try {
      $login(dataLogin, {
        onSuccess: (rs) => {
          window.localStorage.setItem('token-user', rs?.data);
          messageApi.open({
            type: 'success',
            content: 'Login success !',
          });
          navigate(path.HOME)
        },
        onError: () => {
          messageApi.open({
            type: 'error',
            content: 'Login failure !',
          });
        },
        onSettled: () => {
          setDataLogin({
            userName: "",
            password: ""
          })
        }
      })
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Login failure !',
      });
    }
  }


  return (
    <>
     {contextHolder}
      <Modal title="Reset Password" 
      open={isModalOpen} 
      okText="Reset"
      onOk={handleOk} 
      okButtonProps={{ style: {background: 'blue'} }}
      onCancel={handleCancel}>
        <Input value={emailResetPassword} onChange={(e) => setEmailResetPassword(e.target.value)} placeholder="Email for account reset password" />
      </Modal>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 items-center mt-[2%] lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center">
          <p className="text-[60px] text-color-yellow-main font-semibold">R</p>
          <p className="text-[60px] text-gray-500 font-semibold">Friendly</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={dataLogin.userName}
                  onChange={handleChange}
                  id="userName"
                  name="userName"
                  autoComplete="email"
                  required
                  className="block w-full px-2 rounded-md h-[2.5rem] border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm" onClick={showModal}>
                  <a href="#" className="font-semibold text-color-yellow-main">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={dataLogin.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-2 rounded-md h-[2.5rem] border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <ButtonBase isLoading={isPendingLogin} text={"Login"} handleButton={handleLoginForm}></ButtonBase>
            </div>

        </div>
      </div>
    </>
  )
}

export default withHocBase(LoginPage);
