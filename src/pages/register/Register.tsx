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

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);;

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

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result)

        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);


    
    
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
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email" className="flex justify-between w-full">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your password" />
                            </div>
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
                                    type="email" 
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
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Enter your password" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Re-enter Password</Label>
                                <Input id="password" type="password" placeholder="Re-enter your password" />
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button>Create Account</Button>
                    </CardFooter>
                </Card> 
            </div>
            
        </>
     );
}
 
export default Register;

