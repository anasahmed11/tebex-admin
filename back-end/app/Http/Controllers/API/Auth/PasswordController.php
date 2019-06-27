<?php
namespace App\Http\Controllers\API\Auth;
use App\Http\Requests\ForgetRequest;
use App\Http\Requests\ResetRequest;
use Illuminate\Foundation\Auth\ResetsPasswords;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;
use Validator;

class PasswordController extends Controller
{
    use SendsPasswordResetEmails,ResetsPasswords{
        SendsPasswordResetEmails::broker insteadof ResetsPasswords;
    }
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest:api');
    }
    public function sendResetLinkEmail(ForgetRequest $request)
    {

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );
        return $response == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent to your email.'], 200)
            : response()->json(['message' => 'Unable to send reset link'], 422);
    }

    public function reset(ResetRequest $request,$token=null)
    {   if(!is_null($token))
        $request['token']=$token;


        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
            $this->resetPassword($user, $password);
        }
        );

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $response == Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password reset.'], 200)
            : response()->json(['message' => 'Unable to reset password'], 422);
    }
    protected function resetPassword($user, $password)
    {
        $user->password = Hash::make($password);

        $user->save();

        event(new PasswordReset($user));}

}
