Using viber bot with express
`router.post('/viber', bot.middleware());`
`app = bot.middleware()`

I mean how to you code a fallback message? Message received that are not covered with your commands or replies?
Preslav Semov Hadzhitsanev @preslavsh Feb 25 2018 18:41
@totoantonio i am using inverted regex.
let patternsStr = patterns.join('|'); return new RegExp(^((?!(${patternsStr})).)*$,'i');

hi
do u have an issue with bot caching images (menu icons)
if u replace an icon, it's still showing the old one. is there a way to force a refresh on the app?

I'm using the viber keyboard containing a button of ActionType open-url. 
Is there any mechanism to prevent the ActionBody from appearing as a text on chat thread when button clicked?

Hi @spaniakos , thank you responding. I got it resolved after digging it a little and the issue was the Rich message json itself. For it to give a proper error message we need to make the callback as async function and use try catch block to get the error message.
Something like this
bot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
    try {
        await response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name} `));
    } catch (err) {
        console.error(err);
    }    
});

@preslavsh This is the menu I see and I can't find "publish" action.
I want the bot to appear in "Discover" section so that people can type in the name and look for it.
Thanks for your help :D


I want the bot to appear in "Discover" section so that people can type in the name and look for it. I think this action can be performed by viber representatives only ask support guys or your nearest representative.
@preslavsh Thanks for responding. Very appreciate it :D. I have got the bot working. (i.e published). It turns out, the bot can't be accessed by users until it has met the required user count. According to the doc, the bot must have at least six users. (https://support.viber.com/customer/en/portal/articles/2856551-increase-the-reach-of-your-public-account?b_id=3838). In my case, I added two more users and the bot went live. Other people can now scan the QR Code and start chatting. :DD


guys I am getting java.util.concurrent.TimeoutException: Total timeout elapsed',
when trying to connect to the bot
any ideas
why
Preslav Semov Hadzhitsanev @preslavsh Dec 19 2019 15:23
Solved was expired domain


hi, I'm getting random "notSubscribed" error (6) for subscribed users, any ideas?

Preslav Semov Hadzhitsanev @preslavsh Jan 07 11:20
@tintoverano are you sure they are subscribed, sometimes it seems that my server does not get the unsuscribe events. Probably should try to investigate with support.

tintoverano @tintoverano Jan 07 13:06
@preslavsh thanks, I checked with the person in question and he didn't unsubscribe - also, the onError handler wasn't called
I asked him to use the bot again and it behaved for him as he was subscribed
seems like a false positive from the Viber API

hello all ! I didn t turn on viber app last 10 days and now i have problem status: 1,
status_message: 'Result[HttpRequest[POST / HTTP/1.1]@12ff293b > HttpResponse[HTTP/1.1 404 Not Found]@13818b80] null'

hey everyone , does anyone know how to make a clickable keyboard to 
send custom rich media? also the keyboard is not stable if i clicked 
more than one button at same time it is gone :( .thanks in advance - can be solved
with indempotent tokens, checking if the value was twice used

I send a keyboard with buttons with action type - "open-url" and links in the action body, it works fine on Android and in Desktop app, but does not open the browser on all IOS devices. I tried internal and external mode, but that makes no difference.

Preslav Semov Hadzhitsanev @preslavsh Oct 02 15:55
@Vanawy can you sent the keyboard json

Ilya Sakharchuk @Vanawy Oct 02 16:01
@preslavsh Hello, here is full message json
trouble with buttons in rich media

Preslav Semov Hadzhitsanev @preslavsh Oct 02 16:13
Can you try escaping it here: https://www.urlencoder.org/ , or at least some part of. The only time I had similar issue was because I haven't escaped the content property
@Vanawy
Didn't know "ActionBody":"tel:+111111111" that worked


i cant deliver messages it is just stuck on the clock icon but i can receive messages please help me this is very very urgent
Preslav Semov Hadzhitsanev @preslavsh Oct 08 13:04
@Russtan is your domain valid. I had the same issue when my domain was expired.
