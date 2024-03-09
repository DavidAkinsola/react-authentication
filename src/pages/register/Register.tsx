import { useRef, useState, useEffect } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        userRef.current?.focus();
        emailRef.current?.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result)

        const match = matchPwd != "" && pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        //just in case the submit button was enabled via hacking
        const v1 = EMAIL_REGEX.test(email);
        const v2 = USER_REGEX.test(user);
        const v3 = PWD_REGEX.test(pwd);
        if(!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Okay">Try again</ToastAction>,
            })
            return;
        }
        setSuccess(true);
        console.log(user);
        toast({
            title: "You're all set!",
            description: "Check your email inbox to activate your account and login",
            action: <ToastAction altText="Okay">Okay</ToastAction>,
        })

    }
    
    
    return ( 
        <>
            <div className=" flex items-center justify-center">
                <Card className=" w-[350px]">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Creating an account is so much easier, just fill the details below</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p ref={errRef} className={errMsg ? "text-red-500" : "text-green-500"} aria-live="assertive">{errMsg}</p>
                        <form>
                            <div className="grid w-full items-center gap-4">

                                {/* email field */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email" className="flex justify-between w-full">
                                        Email
                                        <span className={validEmail ? "text-green-500" : "hidden"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validEmail || !email ? "hidden" : "text-red-500"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        ref={emailRef}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-invalid = {validEmail ? "false" : "true"}
                                        aria-describedby="emailnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                        placeholder="Enter your Email"
                                    />
                                    <Alert variant="destructive" id="emailnote" className={email && emailFocus && !validEmail ? "" : "hidden"}>
                                        <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
                                        <AlertTitle className="flex justify-between w-full">Important</AlertTitle>
                                        <AlertDescription className=" text-left">
                                            Must enter valid email
                                        </AlertDescription>
                                    </Alert>
                                </div>

                                {/* username field */}
                                <div className="flex flex-col items-start space-y-3">
                                    <Label htmlFor="username" className="flex justify-between w-full">
                                        Username
                                        <span className={validName ? "text-green-500" : "hidden"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validName || !user ? "hidden" : "text-red-500"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </Label>
                                    <Input 
                                        id="username" 
                                        type="text" 
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        required
                                        aria-invalid = {validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        placeholder="Enter your username" 
                                    />
                                    <Alert variant="destructive" id="uidnote" className={user && userFocus && !validName ? "" : "hidden"}>
                                        <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
                                        <AlertTitle className="flex justify-between w-full">Important</AlertTitle>
                                        <AlertDescription className=" text-left">
                                            4 to 24 characters <br />
                                            Must begin with a letter <br />
                                            Letters, numbers, underscores and hyphens allowed.
                                        </AlertDescription>
                                    </Alert>
                                </div>

                                {/* password field */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password" className="flex justify-between w-full">
                                        Password
                                        <span className={validPwd ? "text-green-500" : "hidden"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validPwd || !pwd ? "hidden" : "text-red-500"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        onChange={(e) => setPwd(e.target.value)}
                                        required
                                        aria-invalid = {validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                    <Alert variant="destructive" id="pwdnote" className={  pwdFocus && !validPwd ? "" : "hidden"}>
                                        <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
                                        <AlertTitle className="flex justify-between w-full">Important</AlertTitle>
                                        <AlertDescription className=" text-left">
                                            8 to 24 characters <br />
                                            Must include uppercase and lowercase letters, a number and a special character <br />
                                            Allowed special characters: <span aria-aria-label="exclamation mark">!</span><span aria-aria-label="at symbol">@</span><span aria-aria-label="hash tag">#</span><span aria-aria-label="dollar sign">$</span><span aria-aria-label="percent">%</span>
                                        </AlertDescription>
                                    </Alert>
                                </div>

                                {/* reenter password field */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="match" className="flex justify-between w-full">
                                        Re-enter Password
                                        <span className={validMatch ? "text-green-500" : "hidden"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validMatch || !matchPwd ? "hidden" : "text-red-500"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </Label>
                                    <Input 
                                        id="match" 
                                        type="password" 
                                        placeholder="Re-enter your password"
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        required
                                        aria-invalid = {validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)} 
                                    />
                                    <Alert variant="destructive" id="confirmnote" className={  matchFocus && !validMatch ? "" : "hidden"}>
                                        <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
                                        <AlertTitle className="flex justify-between w-full">Important</AlertTitle>
                                        <AlertDescription className=" text-left">
                                            Must match the first password input field.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button disabled={!validEmail || !validName || !validMatch ? true : false}
                        onClick={handleSubmit}>Create Account</Button>
                    </CardFooter>
                    <div className="pb-2">
                        <p className="text-sm">Already have an account? <Button variant={"link"} >Sign in</Button></p>
                    </div>
                </Card> 
            </div>
        </>
     );
}
 
export default Register;

