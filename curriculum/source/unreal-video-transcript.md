[00:00:00] hello everyone if you are completely new
[00:00:02] to Unreal Engine 5 then this tutorial
[00:00:04] Was Made For You in This tutorial you
[00:00:07] will go from knowing nothing about
[00:00:08] Unreal Engine 5 to creating this
[00:00:12] beautiful world you see right here now I
[00:00:15] know this might look intimidating but do
[00:00:17] not worry every step in this process
[00:00:19] from sculpting the landscape to creating
[00:00:21] the castle will be shown in detail this
[00:00:25] video is pretty long but that's because
[00:00:26] unru Engine 5 is a big program and we
[00:00:29] have a lot to cover C to help navigate
[00:00:31] this video I divided it up into
[00:00:33] individual chapters you can find links
[00:00:35] to all the chapters in the description
[00:00:38] below in this tutorial you will learn
[00:00:40] how to install Unreal Engine 5 and
[00:00:42] create a project how to navigate and
[00:00:44] move objects in your 3D World create
[00:00:46] materials and import 3D models go over
[00:00:50] unreal's amazing new Dynamic lighting
[00:00:52] system called Lumen sculpt Landscapes
[00:00:55] and paint foliage download free Nite
[00:00:58] objects from the mega scans Library
[00:01:00] and finally we will briefly go over how
[00:01:02] to program a game using Blueprints and
[00:01:05] at the end create the fantasy
[00:01:07] environment you see right here I know
[00:01:10] learning unre Legend 5 can be tough at
[00:01:12] first which is why each chapter in this
[00:01:14] video can be treated as its own
[00:01:16] self-contained lesson so if you're ever
[00:01:18] stuck on something you can always go
[00:01:20] back in the video and rewatch that
[00:01:23] chapter also all the assets I use in
[00:01:25] this video are completely free so you
[00:01:28] can follow along with me now with all
[00:01:30] that being said let's jump into ue5 to
[00:01:33] begin before we can use on real Engine 5
[00:01:36] of course we have to download Onre
[00:01:38] Engine 5 to do so you need the epic
[00:01:40] games launcher you can get it from their
[00:01:41] website and come all the way down here
[00:01:44] to the Unreal Engine tab now with the
[00:01:46] tabs up here you want to click on
[00:01:48] library and if you don't see on 5 then
[00:01:50] you don't have it downloaded to download
[00:01:51] it you want to click on the plus icon
[00:01:53] next to engine versions and make sure
[00:01:55] you have five selected and then click on
[00:01:57] install now it's going to ask for an
[00:01:59] install location
[00:02:00] you can just leave at the default place
[00:02:01] but if you do want to bring it somewhere
[00:02:03] else then you can click on browse and
[00:02:05] select a new location but I'm just going
[00:02:06] to leave at default and click install
[00:02:08] once unroll 5 is done downloading all
[00:02:10] you have to do to open up is to click
[00:02:12] launch or you can click launch up here
[00:02:14] but unroll 5 is in set as the default
[00:02:16] engine you can set as a default engine
[00:02:18] by clicking on the drop down and
[00:02:19] selecting UNR of five alternatively if
[00:02:22] you don't want to go through the epic
[00:02:23] games launcher you can click on the drop
[00:02:25] down right here and create a shortcut on
[00:02:27] your desktop now that that shortcut is
[00:02:30] been created let's open up on real
[00:02:31] Engine 5 by just double clicking on the
[00:02:33] application un real project browser will
[00:02:35] pop up when you open up on real engine
[00:02:37] essentially this is where we open up
[00:02:39] recent projects or we create a project
[00:02:41] completely from scratch which is what
[00:02:42] we're going to be doing now you can
[00:02:44] create your project from a template
[00:02:46] which essentially is a pre-made project
[00:02:47] to help point you in the right direction
[00:02:49] with a lot of stuff already done for you
[00:02:51] for example if you're in the car
[00:02:53] industry and you want to render out a
[00:02:54] car then possibly going into the
[00:02:56] automotive Tab and selecting photo
[00:02:58] studio will be a good template from
[00:03:00] where you will start but for our cases I
[00:03:02] want to start from complete scratch so
[00:03:04] I'm going to come to games and make sure
[00:03:06] I select blank now down here is the
[00:03:09] project location where our project is
[00:03:11] going to be saved I just want to save
[00:03:12] this on the desktop if you do want to
[00:03:14] save it somewhere else then you click on
[00:03:15] the file icon right here and browse
[00:03:17] through a different folder now right
[00:03:19] here is the project name so let's call
[00:03:21] this one first
[00:03:23] project and up here are some project
[00:03:25] settings now I'm going to leave it at
[00:03:27] blueprint since we're not going to be
[00:03:28] going over C++ code in this video and
[00:03:31] down here I want to make sure starter
[00:03:32] content is enabled starter content will
[00:03:35] give us some nice assets that we can
[00:03:37] play with to help us learn on real
[00:03:38] Engine 5 below that is raid tracing
[00:03:40] we're not going to go over raid tracing
[00:03:42] just yet and of course to create this
[00:03:44] project let's click on create so this is
[00:03:47] what you should see when opening up on
[00:03:48] real engine for the first time don't
[00:03:50] worry we're going to go over what all
[00:03:51] these different windows and buttons do
[00:03:53] in just a second but before that I want
[00:03:55] to go over how Unreal Engine stores
[00:03:57] projects so let's exal this project and
[00:04:00] we can see that a brand new folder was
[00:04:01] created on our desktop remember I
[00:04:03] selected my desktop as the place to save
[00:04:06] our project essentially this folder
[00:04:08] contains all the data that makes up our
[00:04:10] project so whenever we make a change in
[00:04:12] our project or we create something in
[00:04:14] the project it's going to be stored
[00:04:16] right here now to open up a project
[00:04:18] again all you have to do is double click
[00:04:20] on theu Project asset right there and
[00:04:23] that will open up your project from
[00:04:24] where you last saved it to begin let's
[00:04:27] briefly go over how to navigate the user
[00:04:29] interface and what all these different
[00:04:31] Windows do so probably the window that
[00:04:33] sticks up the most is the viewport right
[00:04:35] here the viewport is essentially just a
[00:04:38] view into our 3D world that we're
[00:04:40] creating so for example we can fly
[00:04:42] around and look at our world we can even
[00:04:44] grab objects and manipulate them all
[00:04:47] within the 3D viewport now don't worry
[00:04:49] we are going to go over camera controls
[00:04:51] and how to move objects in just a bit
[00:04:53] but I first want to go over what the
[00:04:55] different Windows do right above the
[00:04:57] viewport is the toolbar the toolbar is
[00:04:59] pretty important because it's where we
[00:05:00] get a lot of our tools and a lot of the
[00:05:02] different buttons we're going to be
[00:05:03] continually pressing for example what if
[00:05:05] I want to add an object into our world
[00:05:07] then I can click on the plus icon and
[00:05:10] scroll down to shapes and maybe I add in
[00:05:12] a sphere and place in the world to move
[00:05:14] it around I can also switch modes so
[00:05:17] right now I'm in select mode which is
[00:05:19] the main mode where we can move objects
[00:05:20] around let's say if I'm making a
[00:05:22] landscape I can go into Landscaping mode
[00:05:24] and create a landscape or I can go into
[00:05:26] foliage mode and start to paint foliage
[00:05:28] if I do have those assets
[00:05:30] if you are curious we are going to go
[00:05:31] over both modes later in the video now
[00:05:34] to the right of that we have the
[00:05:35] outliner the outliner is essentially a
[00:05:38] list of all the objects that make up my
[00:05:40] current world so for example if I want
[00:05:42] to select a chair but the chair isn't in
[00:05:44] my view right now within the outliner I
[00:05:46] can select a chair right there like that
[00:05:49] I can also select multiple objects by
[00:05:51] holding down control so maybe I want to
[00:05:52] select both chairs just hold on control
[00:05:54] like that and maybe also the statue
[00:05:57] right there the outliner is also a great
[00:05:58] place to organize ize your world for
[00:06:00] example we see we have all these folders
[00:06:02] real quickly if you want to create a
[00:06:03] folder all you have to do is right click
[00:06:05] create folder let's call this one my
[00:06:07] folder and hold it down control let's
[00:06:09] select both chairs and simply drag them
[00:06:12] into there just like this we can also
[00:06:14] hide and unhide objects for example
[00:06:16] maybe I want to edit something that's
[00:06:18] behind the table but the table's in the
[00:06:19] way right now I can come here and
[00:06:21] temporarily click on the I icon to hide
[00:06:24] the table and then click on the I icon
[00:06:26] again to unhide it and right below the
[00:06:29] world outliner we have the details panel
[00:06:31] the details panel is essentially where
[00:06:33] we can edit all the properties of an
[00:06:35] object that we have selected for example
[00:06:38] maybe if I don't like the scale of this
[00:06:40] chair right here I can select a chair
[00:06:43] and come to scale and maybe increase it
[00:06:45] by two in the z-axis which is the
[00:06:47] vertical axis and see that we have a
[00:06:50] really long and tall chair now I don't
[00:06:52] like that edit it looks kind of weird so
[00:06:54] you can always press contrl and z in
[00:06:56] Unreal Engine to undo anything now we do
[00:06:59] have one more default window that's
[00:07:01] arguably the most important window since
[00:07:03] it stores everything we're doing it
[00:07:05] stores information on the chairs the
[00:07:07] table even the entire world and that is
[00:07:10] the content drawer you can get the
[00:07:12] content drawer by going all the way down
[00:07:14] here to the bottom left hand corner and
[00:07:16] clicking on content drawer like that to
[00:07:17] bring it up alternatively since this
[00:07:20] window is pretty important you can press
[00:07:22] control and space at the same time to
[00:07:24] bring it up and close it so if you press
[00:07:26] control and space it's going to bring up
[00:07:27] the content drawer and this gives us a
[00:07:30] folder view of all the assets that make
[00:07:32] up our project so for example if we want
[00:07:35] to see where this chair is being stored
[00:07:37] and maybe we want to edit the chair then
[00:07:39] we can come under starter content props
[00:07:43] and right there we have smore chair if I
[00:07:45] double click on it we can see the chair
[00:07:48] asset and make any adjustments if we do
[00:07:50] need to now we're going to go over the
[00:07:51] static mesh editor later so I can exit
[00:07:54] out of this window by clicking on the X
[00:07:56] icon I'm going to press control and
[00:07:57] space again to bring back my content
[00:07:59] drawer and probably the best example I
[00:08:01] have for the content drawer is that it's
[00:08:03] like your computer's file explorer so
[00:08:05] just like on your computer where you
[00:08:07] have folders and in those folders you
[00:08:08] have subfolders and those subfolders
[00:08:10] contain assets like text files or Word
[00:08:13] documents same exact thing with the
[00:08:14] content drawer in unreal so you have
[00:08:16] folders and in those folders you have
[00:08:18] subfolders and finally you have all
[00:08:20] those assets that make up your project
[00:08:22] so for example here we have the starter
[00:08:24] content folder and I can go into it by
[00:08:26] double clicking like this or I can click
[00:08:29] on it right here within the folder
[00:08:30] window now I can go into any of these
[00:08:33] different folders for example the maps
[00:08:35] folder contains the map we're currently
[00:08:37] editing so we can see up here that this
[00:08:39] map is called minimal default right
[00:08:41] there is minimal uncore default we can
[00:08:43] double check that we are editing this
[00:08:45] map by double clicking on it to open it
[00:08:47] up let's go save and we can see that it
[00:08:49] did open up the exact same map now if I
[00:08:52] ever want to go up a folder I can always
[00:08:54] click on here so right now we're in the
[00:08:56] maps folder if I want to get out of that
[00:08:57] I can click on starter content and if I
[00:09:00] want to get out of that we can even go
[00:09:01] to content right there now don't worry
[00:09:03] if you don't have starter content you
[00:09:05] can click on ADD and then add feature or
[00:09:09] content pack and then go to content and
[00:09:11] simply select start a content and add a
[00:09:13] project I'm not going to do that since
[00:09:15] we did add it when we were creating our
[00:09:17] project as you can guess the content
[00:09:18] drawer is a pretty big deal and maybe
[00:09:20] you don't want to press control and
[00:09:22] space all the time to bring it up you
[00:09:23] always want it docked in your layout
[00:09:25] well all you have to do is click on
[00:09:27] docked in layout like this and now your
[00:09:29] content drawer will be right here at the
[00:09:31] bottom and notice how it's called
[00:09:33] content browser right now not called
[00:09:34] content drawer so whenever I say content
[00:09:36] browser and content drawer just know
[00:09:38] that I'm talking about the same exact
[00:09:39] thing now this is great but this tab
[00:09:42] right here is taking up a little bit of
[00:09:44] real estate if you ever want to get rid
[00:09:46] of a tab all you have to do is right
[00:09:47] click and click on high tabs if you want
[00:09:50] to get back that tab then you can click
[00:09:52] on the very small blue triangle and that
[00:09:54] will bring back your tab also Tabs are
[00:09:57] great because if you left Mouse button
[00:09:59] and hold you're able to move this around
[00:10:01] and dock it somewhere else so maybe if I
[00:10:03] don't want content browser at the bottom
[00:10:05] right here I can dock it to the side or
[00:10:08] I can even dock it to one of the tabs
[00:10:11] right here and now I'm able to switch in
[00:10:13] between details and the content browser
[00:10:16] also if you ever want to move Windows
[00:10:18] around you can hover in between the
[00:10:20] windows and then you're able to move it
[00:10:22] down just like this to adjust exactly
[00:10:25] how you want your user interface now
[00:10:27] another neat trick is that if I dock my
[00:10:29] content browser right here and let's go
[00:10:31] make it a little bit smaller and maybe I
[00:10:33] don't want it always visible I can right
[00:10:35] click and go dock to sidebar now
[00:10:38] whenever I want my content browser or
[00:10:39] any other window I can just click right
[00:10:42] here and it will show now if I don't
[00:10:44] want to do to sidebar I can right click
[00:10:46] and unlock from sidebar just like that
[00:10:49] now I'm going to click on the X icon to
[00:10:51] get rid of that content browser
[00:10:53] alternatively if I want to automatically
[00:10:55] dock all my windows in a sidebar except
[00:10:57] the viewport I can click on F10 which
[00:11:01] will go into full screen mode and now we
[00:11:03] can see that my outliner and details
[00:11:05] window and any other windows I have on
[00:11:08] the side will go into docked mode and
[00:11:10] then I can click on F10 again to bring
[00:11:12] those windows back so F10 is a neat
[00:11:15] shortcut to automatically dock all your
[00:11:17] windows now these are just the default
[00:11:19] Windows if you want to see all the
[00:11:21] windows that are available to us we come
[00:11:23] up to Windows and select any of these
[00:11:26] now one window that we are going to be
[00:11:27] using a lot is the world settings so
[00:11:30] World settings as you can guess just has
[00:11:33] a bunch of different properties and
[00:11:34] settings that we can play with to edit
[00:11:36] the map we currently have opened now for
[00:11:39] example what if we really mess up our
[00:11:42] user interface it's basically unreadable
[00:11:44] we have no idea what is happening don't
[00:11:47] worry we can always come up to window
[00:11:49] and all the way down here go to load
[00:11:50] layout and click on default editor
[00:11:52] layout which will just reset all of our
[00:11:55] Windows now that we have the very basics
[00:11:57] of the user interface out of the way we
[00:11:59] we can move on to the fun stuff and that
[00:12:01] is camera navigation so how to navigate
[00:12:04] our camera around our 3D World so we can
[00:12:06] view it at all different angles to
[00:12:08] navigate is actually easier than you
[00:12:10] think so you want your cursor inside the
[00:12:12] viewport and then you want to hold down
[00:12:13] the right Mouse button if you now move
[00:12:15] your mouse with the right Mouse button
[00:12:17] held down you able to look around your
[00:12:18] scene and still with a right Mouse
[00:12:20] button held down you're able to use the
[00:12:22] W ASD keys to move around you can also
[00:12:25] use e and Q to go up and down so that's
[00:12:29] e to go up Q to go down W to move
[00:12:32] forward s to move backwards and a and d
[00:12:35] to move left and right all the while
[00:12:37] holding down the right Mouse button if
[00:12:39] you are not holding down the right Mouse
[00:12:40] button and you try to use WD then
[00:12:43] nothing will happen so make sure you do
[00:12:44] hold that down now we can also control
[00:12:46] our camera speed so let's say for
[00:12:48] example there's an object that's really
[00:12:49] far away and you want to go towards that
[00:12:51] object but your camera is moving too
[00:12:52] slow well if you come up here to the top
[00:12:54] right hand corner and select the camera
[00:12:56] icon you're now able to control that
[00:12:58] speed so right now we're at four we can
[00:13:00] also bring this up to six and now we are
[00:13:02] a lot faster and we can bring this all
[00:13:04] the way down to one and we can see that
[00:13:06] we are pretty slow so let's leave it at
[00:13:09] four and a shortcut to access camera
[00:13:10] speed is to of course hold down the
[00:13:13] right Mouse button and use a scroll
[00:13:15] wheel so scroll wheel up we'll move
[00:13:16] faster and scroll wheel down we'll move
[00:13:19] slower so that's a shortcut that's why
[00:13:21] you don't have to come up here and
[00:13:23] continually play with the camera speed
[00:13:24] if you do want to move faster or slower
[00:13:26] here's a really good tip let's say if
[00:13:28] you scroll really far away so you fly
[00:13:31] really far away from where the bulk of
[00:13:33] your geometry where your world is and
[00:13:34] then you look around and you can't find
[00:13:36] your objects anymore what you can do is
[00:13:38] come up to any of the objects right here
[00:13:40] let's say for example the chair select
[00:13:41] that and then press the F key to focus
[00:13:44] on that object so if you select an
[00:13:47] object you can press F to then snap to
[00:13:49] that object just like this so that's how
[00:13:51] you're never lost in your world so if
[00:13:53] you ever played any first person games
[00:13:55] you should be right at home since the
[00:13:57] muscle memory is there for the W ASD key
[00:13:59] and rotating your camera by moving your
[00:14:02] mouse now if we press F again to then
[00:14:05] zoom in onto an object we can rotate
[00:14:07] around that object by holding down alt
[00:14:09] and the left Mouse button so alt and
[00:14:11] left Mouse button allows us to rotate
[00:14:14] around a pivot object and if we hold
[00:14:16] down alt and hold down the right Mouse
[00:14:18] button we can zoom in and out so right
[00:14:20] Mouse button zoom in and out left Mouse
[00:14:23] button to Pivot around that object and
[00:14:26] to focus on object of course you want to
[00:14:28] select it and and press the F key just
[00:14:30] like
[00:14:31] beforehand before we move on let's
[00:14:33] briefly go over the viewport controls so
[00:14:36] we know the different ways that we can
[00:14:37] view our world so up here we have
[00:14:39] perspective let's say if you want a top
[00:14:41] down bird's eye view then we can click
[00:14:42] on the perspective button and select top
[00:14:45] like this so to control in an
[00:14:47] orthographic View mode you want to hold
[00:14:48] down the right Mouse button to pan and
[00:14:51] of course use a scroll wheel to zoom in
[00:14:53] and out so right mus button pan scroll
[00:14:56] wheel to zoom in and out we can also
[00:14:58] view it from the side side like maybe
[00:14:59] the left side saving controls and of
[00:15:02] course if you want to go back into
[00:15:03] perspective we come up here select the
[00:15:05] button and click on perspective notice
[00:15:08] how a lot of the buttons in unreal have
[00:15:09] a shortcut right next to it for example
[00:15:12] perspective shortcut is alt and G so
[00:15:14] instead of coming all the way up here
[00:15:16] and selecting perspective in the
[00:15:17] dropdown I can just press the alt and G
[00:15:20] key at the same time to go back into
[00:15:22] perspective so right next to perspective
[00:15:25] is our view modes so view modes are
[00:15:27] pretty great because they allow us to
[00:15:29] see our world in different ways for
[00:15:31] example maybe we don't want to see all
[00:15:32] the lights and we just want to see the
[00:15:33] colors of our world instead of coming up
[00:15:35] to LIT I can select unlit right there or
[00:15:38] I can even select wireframe to see our
[00:15:41] world's edges and vertices we will be
[00:15:43] changing our view modes a lot since it's
[00:15:45] a great way to debug our scene and see
[00:15:47] if there's anything wrong so I'm going
[00:15:49] to come back up here to LIT or the
[00:15:51] shortcuts are alt four for lit alt three
[00:15:54] for unlit and ALT two for wireframe so
[00:15:57] let's jump back with alt and for to get
[00:16:00] our default view and right next to our
[00:16:02] view modes is the showx so showx allow
[00:16:05] us to turn on and off different object
[00:16:07] types for example what if I don't want
[00:16:10] this grid right here at the bottom then
[00:16:12] I could come to show let's go find where
[00:16:14] grid is and uncheck that to hide the
[00:16:16] grid now maybe for some reason you don't
[00:16:18] want to show our static meshes and
[00:16:21] essentially static meshes are all the
[00:16:23] objects you see right here then within
[00:16:25] the show Flags we can uncheck static
[00:16:26] meshes and we no longer see those static
[00:16:29] meshes now obviously we don't want that
[00:16:32] and if you ever mess up your show Flags
[00:16:33] you can bring back the default Flags by
[00:16:36] clicking on use defaults and keep in
[00:16:38] mind that we aren't deleting anything
[00:16:40] with show Flags they just help us see
[00:16:42] what we want in the viewport and finally
[00:16:44] this is my favorite viewport option and
[00:16:46] that is game view so if you come up here
[00:16:49] and click on the button with the three
[00:16:50] lines we have game view all the way down
[00:16:53] here and we can see that the shortcut is
[00:16:55] G now if I enable game view we're going
[00:16:58] to see exact ex actly what the player
[00:16:59] will see in game so if I press G to Uno
[00:17:03] game view we can see that we have all
[00:17:05] these different widgets and we have the
[00:17:07] grid right here and of course the player
[00:17:09] won't see the sun widget right here
[00:17:11] which controls the sun's rotation
[00:17:13] instead if we want to see exactly what
[00:17:15] the game will see we click on G to hide
[00:17:17] all those widgets and features that are
[00:17:19] here for us the editor so just know that
[00:17:23] throughout this tutorial when you see a
[00:17:25] bunch of widgets and these widgets just
[00:17:27] disappear that's because I togg on game
[00:17:29] view with the G key now that we know how
[00:17:32] to navigate around our world it's time
[00:17:34] to go over how to create new objects and
[00:17:36] move them around so we're going to go
[00:17:38] over moving scaling and rotating objects
[00:17:42] to begin let's go over simple movement
[00:17:44] I'm going to press a g key to get rid of
[00:17:46] our editor widgets and now all we see is
[00:17:48] our world so to move an object simply
[00:17:50] select it and by default we get the
[00:17:52] translation or the movement Gizmo to
[00:17:55] move an object hover over any of these
[00:17:57] arrows and hold hold down the left Mouse
[00:18:00] button so I'm able to move this chair
[00:18:02] around but notice how moving the chair
[00:18:04] isn't smooth that's because by default
[00:18:07] snapping is turned on now you can turn
[00:18:09] off snapping by coming up here and
[00:18:11] unchecking the grid icon like that so
[00:18:14] now we can smoothly move our objects
[00:18:16] around now I'm going to turn it back on
[00:18:18] because it's important to know that
[00:18:19] unreal uses centimeters so right now
[00:18:22] since there's a 10 right next to the
[00:18:23] icon it's snapping every 10 cm we can
[00:18:27] change this by selecting the number and
[00:18:29] in the drop down let's select 100 so now
[00:18:32] it's moving every 100 cm which is 1 M so
[00:18:36] every time the chair moves it moves 1 M
[00:18:39] so that's pretty important to know now
[00:18:41] I'm going to uncheck it because I do
[00:18:42] want smooth movement next up is rotation
[00:18:46] so to rotate your object you want to
[00:18:47] change its Gizmo to change a gizmo you
[00:18:50] want to select one of the buttons up
[00:18:52] here so right now it's on translation
[00:18:54] right next to it is rotation now I can
[00:18:57] rotate this chair and in all these
[00:18:59] different axes we can see that rotation
[00:19:02] snapping is turned on if I want to turn
[00:19:04] that off then right next to translation
[00:19:07] snapping we have this icon right here
[00:19:09] make sure it's not blue and now we're no
[00:19:11] longer snapping every 10° I can press
[00:19:14] contrl Z to undo all those changes and
[00:19:17] let's go over scaling so right next to
[00:19:20] rotation we have scaling and scaling
[00:19:22] works pretty similar to the rest of the
[00:19:24] gimbos all you have to do is hover over
[00:19:27] any of these squares hold down the left
[00:19:29] Mouse button and now we're going to
[00:19:31] scale in that exact Direction so if we
[00:19:34] want to turn off scale snapping of
[00:19:36] course just uncheck the icon right there
[00:19:38] and now we can smoothly scale and press
[00:19:40] control z a bit because it's important
[00:19:43] to point out that if I hover my mouse
[00:19:45] not over one of the individual squares
[00:19:47] but the one square that's connecting all
[00:19:48] of them so the one in the middle hold
[00:19:50] down the left Mouse button I can move my
[00:19:53] chair and scale it uniformly up and down
[00:19:56] so not in any particular a
[00:19:59] so I press contrl Z to undo all those
[00:20:02] and if we hover over all these buttons
[00:20:04] we see that there's shortcuts so
[00:20:06] movement is W rotation is e and scaling
[00:20:10] is R so that means it's w to move e to
[00:20:14] rotate and R to scale so those are some
[00:20:18] of the most common shortcuts that we're
[00:20:20] going to be using consistently
[00:20:22] throughout our time in Unreal Engine so
[00:20:24] again one last time it is W to move e to
[00:20:29] rotate and R to scale I also want to
[00:20:32] point out that if we want to move our
[00:20:35] object in the direction of our object
[00:20:37] then come up to this little Globe icon
[00:20:40] select it that's how it's now a square
[00:20:43] and we can see that we're now able to
[00:20:45] move the object in that object's
[00:20:48] Direction so move it locally instead of
[00:20:51] globally if we want to switch it back to
[00:20:53] Global then click the square icon again
[00:20:56] to make it a globe and now we're moving
[00:20:58] it in the direction of the world and not
[00:21:01] that individual object it's also
[00:21:03] important to point out that if I press W
[00:21:05] to get a translation widget and if I
[00:21:07] hover over the square that's in between
[00:21:09] the different axes I'm able to lock it
[00:21:12] and move it only in those two axes so if
[00:21:15] I hover in between the Y and xaxis I'm
[00:21:18] just moving it in between those and not
[00:21:20] in the z-axis I can also lock it in
[00:21:22] between the z and y AIS just like this
[00:21:25] so let's press controll and Z to undo
[00:21:27] those changes
[00:21:29] now you're probably wondering how do we
[00:21:30] create an object in our world well
[00:21:32] there's a couple ways number one is that
[00:21:34] we can duplicate an object so with any
[00:21:37] object selected for example this statue
[00:21:39] if I press contrl and D then we just
[00:21:42] duplicate that object now we didn't
[00:21:44] notice to change that's because it
[00:21:45] duplicated it in the same spot as the
[00:21:47] original object so if I hold down left
[00:21:50] Mouse button and move it out of the way
[00:21:53] we can see that we did duplicate that
[00:21:55] object and within the outliner there's
[00:21:57] now a new object called statue 2 which
[00:21:59] is a copy of the original Statue so
[00:22:01] let's delete statue 2 and there is an
[00:22:04] easier way to duplicate and this is the
[00:22:05] way I duplicate and that is hovering
[00:22:08] over an arrow with a translation widget
[00:22:10] selected and holding down alt and left
[00:22:13] Mouse button so hold down both of those
[00:22:15] and simply drag and now we're able to
[00:22:18] easily duplicate and drag an object away
[00:22:21] so let's press control Z to undo all
[00:22:23] those changes now another way to create
[00:22:26] an object is by using the add tool up
[00:22:29] here in the toolbar so for example let's
[00:22:31] click on ADD and let's come all the way
[00:22:34] down here to shapes and maybe we want to
[00:22:35] drag in a sphere simply draging in like
[00:22:38] this or we can even add in a light like
[00:22:41] a point light and we're able to drag it
[00:22:44] around in our scene so let's go delete
[00:22:47] those and finally the last way to add an
[00:22:50] object is through the content browser so
[00:22:52] let's bring up the browser by holding
[00:22:54] down control and space at the same time
[00:22:55] pressing both of those and let's go into
[00:23:00] props and to add an object into a Conta
[00:23:02] browser hold down the left Mouse button
[00:23:04] and drag it into your world for example
[00:23:06] this couch so let's go move it down just
[00:23:10] like this and now we have a brand new
[00:23:12] object so by holding on shift you can
[00:23:15] select multiple objects so for example
[00:23:17] if I have my chair on the left selected
[00:23:20] and I want to select a chair on the
[00:23:21] right if I hold down shift now I have
[00:23:23] them both selected if I hold down shift
[00:23:25] again I can add in the table and the
[00:23:28] statue now if I want to deselect an item
[00:23:31] all I have to do is hold down control
[00:23:33] and click on any items to deselect them
[00:23:36] now all we have is the statue and the
[00:23:38] left chair selected and here's another
[00:23:41] tip if I have the chair selected hold
[00:23:44] down alt and the left Mouse button to
[00:23:46] drag out a new chair let's say if I want
[00:23:48] to drag this chair all the way over
[00:23:50] there then I'm going to have to drag it
[00:23:52] across the screen move my camera drag it
[00:23:55] across my screen again and it's just a
[00:23:57] huge hassle
[00:23:58] another way I can do it is by holding
[00:24:01] down the shift while I'm dragging so if
[00:24:04] I'm going to hold on the left Mouse
[00:24:05] button I want of these arrows and I want
[00:24:07] to lock my camera to the object simply
[00:24:10] hold down shift and you're able to lock
[00:24:12] a camera to an object which can save on
[00:24:15] a lot of time so I'm going to press
[00:24:17] delete and let's create a very very
[00:24:20] simple scene just to get a hang of all
[00:24:22] the controls so to begin I want to hold
[00:24:25] down shift and let's select these two
[00:24:27] chairs hold down alt and duplicate the
[00:24:31] mouse so let go hold down alt and left
[00:24:33] Mouse button again alt and left Mouse
[00:24:36] button again now let's go rotate some of
[00:24:39] these chairs that's why they're facing
[00:24:41] inwards so select a chair press e to get
[00:24:46] the rotation Gizmo up and have them all
[00:24:49] face
[00:24:51] inside just like this again it doesn't
[00:24:54] have to be pretty perfect because we're
[00:24:56] just trying to get used to the controls
[00:24:58] at this
[00:24:58] point and then I'm going to select the
[00:25:01] table press R to scale it and I want to
[00:25:05] elongate the table just a little bit
[00:25:07] maybe even in its X AIS press e again
[00:25:12] let's rotate this press W move it into
[00:25:15] the middle right there select the chair
[00:25:18] hold on shift let's select the other
[00:25:20] chair and move them all in let's select
[00:25:24] the statue move it into the middle press
[00:25:27] r scale this
[00:25:29] up
[00:25:31] and maybe add some lamps on both sides
[00:25:34] of the table so press control and space
[00:25:37] within our content starter content and
[00:25:39] props we have this smore lamp ceiling if
[00:25:43] I drag it in this is exactly what I want
[00:25:46] but right now it's in the opposite
[00:25:48] direction so I want this to be placed on
[00:25:50] the ground I could press e rotate this
[00:25:54] and try to get to
[00:25:56] 180° or I could press contrl + z and
[00:25:59] reenable snapping for rotation right
[00:26:03] here and rotate it
[00:26:05] exactly - 180° which is what I want so
[00:26:09] press W and let's move it that's so it's
[00:26:13] directly placed against the ground like
[00:26:18] right here so I could try to guess
[00:26:22] exactly where it is or I could snap any
[00:26:25] object I have selected to the object
[00:26:27] that's directly below it by pressing the
[00:26:29] end key so that's e and D not the end
[00:26:32] letter so press e and D end and snap it
[00:26:36] there just like that so press R again
[00:26:39] scale this up in the
[00:26:41] z-axis hold down alt and drag it in both
[00:26:45] the Y and x- axis right there like this
[00:26:49] let's hold down shift again and drag
[00:26:52] both of
[00:26:53] those
[00:26:55] across our world just like that and I
[00:27:00] would say
[00:27:01] congratulations you now have a very very
[00:27:04] simple level this is definitely not the
[00:27:07] best map but it is pretty good as a
[00:27:10] first level now that you finished your
[00:27:12] first level it's time to move on to the
[00:27:14] postprocess volume so we're going to go
[00:27:16] over how we can change the settings of
[00:27:18] our viewport camera specifically
[00:27:20] exposure while in the process of
[00:27:21] creating our first level you might have
[00:27:23] noticed that if we zoom into the Shadows
[00:27:26] we see our screen gets brighter and
[00:27:28] brighter and brighter and then when we
[00:27:30] zoom out our screen gets darker so that
[00:27:33] is auto exposure and what exposure is
[00:27:35] trying do is it's trying to mimic the
[00:27:37] way our eyes work so for example if
[00:27:39] you've ever been in a very dark room and
[00:27:42] you decide to jump out into the daylight
[00:27:44] you can feel your eyes start to hurt and
[00:27:46] everything is really bright but slowly
[00:27:49] over time your eyes start to adjust
[00:27:51] until everything comes into focus and
[00:27:53] that is exactly what Unreal Engine is
[00:27:55] trying to mimic by brightening our
[00:27:57] screen
[00:27:58] and darkening our screen so I think we
[00:28:01] can create a better example by
[00:28:03] duplicating this map and creating a
[00:28:05] little house so to do so let's press
[00:28:07] control and space to go into our content
[00:28:09] drawer and I want to duplicate minimal
[00:28:12] undor default which is right now located
[00:28:15] in starter content and Maps so right
[00:28:19] here is the current level that we have
[00:28:21] there's a little Aster right next to it
[00:28:22] and that tells us that it needs to be
[00:28:24] saved so press contrl s to save the
[00:28:26] level and to duplicate the level simply
[00:28:28] press contrl and D to duplicate now
[00:28:31] let's go rename this to post process
[00:28:35] example and let's go save it so if I
[00:28:38] double click on minimal default this is
[00:28:41] the current map that we've been on and
[00:28:43] then if I double click on postprocess
[00:28:44] example this is the new map that we're
[00:28:47] about to edit now notice that our grid
[00:28:49] is pretty large right now that's because
[00:28:51] we have our snapping sent to 100 we can
[00:28:54] make the grid squares smaller by saying
[00:28:57] this back to 10
[00:28:58] as its default so now our grid is a
[00:29:00] little bit smaller or you can press G to
[00:29:03] hide all those editor widgets now I want
[00:29:05] to start deleting all these objects so
[00:29:07] simply select an object and delete it to
[00:29:10] get rid of it and here is a little tip
[00:29:14] if I go into the outliner since I do
[00:29:16] want to delete all these chairs I could
[00:29:18] hold down control and select each chair
[00:29:21] individually or I can select the first
[00:29:23] chair at the very top of the list hold
[00:29:25] down shift and select the last one and
[00:29:28] then it'll select everything in between
[00:29:30] so control is to select individual
[00:29:33] objects and hold down shift is to select
[00:29:36] a row of objects and press delete now
[00:29:40] let's create a little Hut so I'm going
[00:29:43] to come up to add and hold down the left
[00:29:45] Mouse button on Cube to add in a very
[00:29:48] simple Cube keep in mind that this is
[00:29:50] just for demonstrations to show exposure
[00:29:53] so this won't be the best hold down alt
[00:29:57] let's go duplicate this wall and hold on
[00:30:00] alt
[00:30:01] again press e and I want to make sure
[00:30:04] snapping is turned on so I can rotate
[00:30:06] this exactly 90° right there hold down
[00:30:10] alt again and drag it out just like this
[00:30:14] so hold down alt rotate this as a roof
[00:30:18] and I do want a slight opening so that
[00:30:20] the sun can come through and illuminate
[00:30:23] the
[00:30:25] inside of this Hut right right here like
[00:30:29] that so now notice that if I zoom in on
[00:30:34] this and go inside the hut we can see
[00:30:37] our screen get brighter and brighter and
[00:30:40] brighter and then as soon as I fly out
[00:30:44] our screen gets darker so when I go
[00:30:47] inside our eyes adjust it gets lighter
[00:30:50] so that we can see exactly what is
[00:30:52] inside the hut and then if I zoom
[00:30:54] outside our eyes get darker now this can
[00:30:58] be annoying if you are building out
[00:31:00] worlds so to turn it off and to lock
[00:31:03] your screen to a certain brightness we
[00:31:05] could come up to lit and all the way
[00:31:07] down here under exposure uncheck game
[00:31:10] settings now we have a constant
[00:31:12] brightness that even if I go inside the
[00:31:13] hut we see that our screen isn't getting
[00:31:16] darker now right underneath game
[00:31:19] settings we have ev00 if I bring this
[00:31:21] down our screen gets brighter and if I
[00:31:25] bring this up our screen gets darker so
[00:31:28] we can leave it at zero for now now
[00:31:31] there is just one issue and that is this
[00:31:34] change doesn't apply to gameplay to play
[00:31:36] the game come up to the toolbar and
[00:31:38] click on the play icon now we are
[00:31:40] currently in game but if we let's say go
[00:31:44] into the Hut we see auto exposure is
[00:31:46] turned on since our screen gets brighter
[00:31:48] and when I leave the screen gets darker
[00:31:51] on a side note if you want to stop
[00:31:52] playing the game press the Escape key to
[00:31:55] exit out maybe this is what you want
[00:31:57] when you're building out your world you
[00:31:58] have a constant exposure and then when
[00:32:00] you're in game you have Auto exposure
[00:32:02] turned on but if you do want to edit the
[00:32:04] exposure directly in game this is where
[00:32:07] post-process volumes come in handy now
[00:32:09] we won't be able to see the exposure
[00:32:11] changes with the post-process volume
[00:32:12] with game settings turned off socum to
[00:32:14] lit and make sure game settings is
[00:32:16] turned on again and within the outliner
[00:32:18] by default we will have a global
[00:32:20] post-process volume for this map so with
[00:32:23] the post-process volume selected within
[00:32:25] the outliner we see that we have drop
[00:32:28] down called exposure and we have
[00:32:30] exposure compensation now in order to
[00:32:32] edit any of these properties you want to
[00:32:34] make sure that they are turned on first
[00:32:37] and then we're able to adjust exposure
[00:32:40] but Auto exposure is still turned on
[00:32:42] right now so what we can do is Select
[00:32:45] metering mode and instead of Auto
[00:32:47] exposure histogram select manual now we
[00:32:51] control ex exactly what our exposure is
[00:32:54] with the exposure compensation so if we
[00:32:56] leave it at 9
[00:32:58] press play again we see that we don't
[00:33:00] have any auto exposure in game so you
[00:33:04] might be wondering exactly what the
[00:33:05] postprocess volume is well the
[00:33:07] postprocess volume is a great way to add
[00:33:09] some effects after everything has been
[00:33:11] rendered so the post-process volume only
[00:33:14] affects our camera for example maybe we
[00:33:16] want some more Bloom so we select Bloom
[00:33:19] and right now intensity is at
[00:33:20] 0.675 I can boost this up all the way to
[00:33:24] let's say eight and maybe if I want the
[00:33:26] default values back instead of trying to
[00:33:29] guess what the default values are I
[00:33:31] could come over here and select that
[00:33:33] backwards Arrow which will set
[00:33:35] everything back to its default value we
[00:33:37] also have a bunch of other settings for
[00:33:40] example under image effects we can add a
[00:33:43] very strong vignette so right now it's
[00:33:45] at 0.4 we can bring this up all the way
[00:33:47] to one so there's a lot of darkening
[00:33:50] around the size of the camera or we can
[00:33:52] completely turn off vignettes by
[00:33:54] bringing it down to zero so by default
[00:33:56] unreal does have a little bit of V yet
[00:33:58] with it being at 0.4 we can also go down
[00:34:01] here and change some of the color
[00:34:03] grading so maybe if I select saturation
[00:34:07] I can move the wheel around we see just
[00:34:10] a little bit of changes I can even boost
[00:34:12] the saturation down here so instead of
[00:34:13] one drag this up and now we have a
[00:34:17] really vibrant and saturated scene and
[00:34:20] of course I can uncheck this to get rid
[00:34:22] of that change so if you want there are
[00:34:24] a ton of different settings you can go
[00:34:26] through and see what all them R but you
[00:34:29] might be wondering how do I create a
[00:34:30] post-process volume if I don't have it
[00:34:32] inside of our world so to begin I'm
[00:34:35] going to press G key to bring back all
[00:34:37] of our editor widgets select the
[00:34:39] postprocess volume and let's delete it
[00:34:41] so we can go over how to create a
[00:34:42] post-process volume from scratch of
[00:34:45] course we're going to select the add
[00:34:46] button it's going to be under
[00:34:49] volumes down here we have post-process
[00:34:51] volume so simply drag this into our
[00:34:53] world and we see that we have a little
[00:34:55] square so let's make a very quick change
[00:34:58] so the change I want to make is down
[00:35:02] here within globals and saturation
[00:35:04] instead of one I'm going to change this
[00:35:06] to zero but we notice that there are no
[00:35:09] changes to our camera right now that's
[00:35:11] because the post-process volume by
[00:35:13] default only affects whatever is inside
[00:35:16] the postprocess volume so if we move
[00:35:18] into the cube we can see those changes
[00:35:21] taking into effect and right now by
[00:35:24] changing Global saturation bringing it
[00:35:25] down all the way to zero it gives us a
[00:35:28] black and white world now what if I want
[00:35:31] this post-process volume to affect our
[00:35:33] entire world well scroll all the way
[00:35:36] down here and under infinite extent
[00:35:39] Unbound make sure that's turned on so
[00:35:42] that's how we don't have to be within
[00:35:43] the postprocess volume for that
[00:35:45] post-process volume to take effect now
[00:35:47] it's time to go over materials but do
[00:35:49] keep in mind that materials can be a
[00:35:51] little bit complicated especially if
[00:35:53] you're brand new to 3D Arts so if you do
[00:35:56] find yourself a little bit lost
[00:35:57] throughout this course do keep in mind
[00:35:59] that you can always go back in a section
[00:36:01] and rewatch it to demonstrate materials
[00:36:04] I want to create a brand new map so to
[00:36:06] do so let's create a folder where we're
[00:36:08] going to store all the assets we create
[00:36:10] so I want this folder to be under
[00:36:12] content right next to the starter
[00:36:13] content folder right click and select
[00:36:16] new folder I'm going to call this folder
[00:36:18] my stuff and double click to go inside
[00:36:21] of it now to create a level I could
[00:36:23] rightclick and under create basic assets
[00:36:25] select level but I want to use a level
[00:36:28] template since this will just create a
[00:36:29] completely blank level so to use level
[00:36:31] templates you want to come up to file
[00:36:34] new level and you can select open world
[00:36:36] or basic I'm going to select basic and
[00:36:40] now we have a pretty basic level is just
[00:36:42] the floor right here and the sky now in
[00:36:45] order to save this level in a specific
[00:36:47] location in our content browser you need
[00:36:48] press contrl and S and it's going to ask
[00:36:51] us where we want to save this level
[00:36:53] select my stuff and let's call this one
[00:36:56] material example level and then select
[00:36:59] save now pressing control and space to
[00:37:01] bring to my content drawer we can see
[00:37:03] that under my stuff our level is saved
[00:37:05] so if we ever want to go back into this
[00:37:06] level I just have to double click and we
[00:37:09] will open up that level now I do want to
[00:37:11] make some adjustments if we zoom in on
[00:37:13] the floor we can see that our grid is
[00:37:14] showing through and it's right on top of
[00:37:16] the floor now this grid will be
[00:37:18] distracting when we're showing off
[00:37:19] materials so I'm going to come up to
[00:37:21] show and uncheck the grid to hide it
[00:37:24] that's how all we see is the floor
[00:37:25] material also I think this floor is a
[00:37:28] little bit too big for our purposes so I
[00:37:30] could use R and hover in between the y
[00:37:33] and x axis to then scale it down like
[00:37:36] this or alternatively within the details
[00:37:39] panel of this floor I can set it to one
[00:37:42] in the x-axis one in the Y AIS and one
[00:37:45] in the
[00:37:46] z-axis just to give us a smaller floor I
[00:37:49] also want to add in an object to place
[00:37:51] our materials on top of and we can do so
[00:37:53] by pressing control and space and unreal
[00:37:56] actually comes with a bunch of assets
[00:37:58] and objects by default so this is
[00:38:00] content that's not located in starter
[00:38:02] content instead it's located in the
[00:38:04] engine folder and if you don't see your
[00:38:06] engine folder right here that's because
[00:38:08] you need to come to settings and make
[00:38:10] sure show engine content is enabled now
[00:38:12] we get access to all of unreal's default
[00:38:15] content that is contained in every
[00:38:17] single project so let's go into content
[00:38:20] and I believe it is under engine meshes
[00:38:22] and it's specifically smore map preview
[00:38:25] mesh now we can also select select
[00:38:28] engine and type in smore mat to bring up
[00:38:32] that asset so I'm going to drag it into
[00:38:34] our world and let's rotate it 90° and we
[00:38:38] can rotate it 90° exactly by making sure
[00:38:41] snapping is enabled up here now I also
[00:38:45] want to control the exposure since if we
[00:38:48] zoom in on the shadows and zoom out we
[00:38:51] can see that auto exposure is enabled
[00:38:53] right now so let's create a postprocess
[00:38:54] volume by going to volumes post process
[00:38:58] simply dragging it out I want this to
[00:39:00] affect the entire world not just
[00:39:02] whatever is inside this box so scroll
[00:39:05] down and make sure infinite extend bound
[00:39:08] is turned on now if we go up here under
[00:39:12] exposure make sure metering mode is set
[00:39:15] to manual instead of Auto and exposure
[00:39:17] compensation we can bring this up I
[00:39:20] found a value of 11 to be pretty good
[00:39:22] now as a reminder if your exposure isn't
[00:39:25] changing from your postprocess volume
[00:39:27] you you need to make sure that in lit
[00:39:29] game setting is turned on cuz otherwise
[00:39:31] it's going to default to ev00 setting
[00:39:33] right here as the exposure amount so
[00:39:36] make sure game views turned on that's
[00:39:38] how we're using postprocess volume and
[00:39:40] since I do like my scene right now you
[00:39:42] want to make sure to save everything
[00:39:43] with contrl and S and actually I think
[00:39:46] I'm going to bring down my exposure to
[00:39:49] let's leave it at 10.5 so now it's
[00:39:51] finally time to go over materials and
[00:39:53] adding a material to your world is
[00:39:55] actually pretty simple so press control
[00:39:58] space and luckily starter content comes
[00:40:00] with a bunch of materials by default
[00:40:02] under the materials folder so let's
[00:40:04] double click into materials and we see
[00:40:07] we have a bunch of materials that we can
[00:40:09] use so to add a material to our world
[00:40:11] you want to Simply hold down the left
[00:40:12] Mouse button and drag it until you're
[00:40:14] hovering over whatever object you want
[00:40:16] this material to be placed on and let go
[00:40:19] it is that simple so now we have a brick
[00:40:21] floor or for example to make this object
[00:40:24] steel I can drag a steel material onto
[00:40:27] the object and let
[00:40:28] go we can even add a grass right there
[00:40:31] like this and we can see the reflections
[00:40:33] updates on the metal right there
[00:40:36] whenever we are switching our different
[00:40:39] materials which is pretty cool so let's
[00:40:42] select the grass and I do actually want
[00:40:45] to make this just a little bit bigger so
[00:40:47] let's scale it in X and Y AIS like this
[00:40:51] and I think the screen is too bright so
[00:40:53] I'm going to bring its exposure
[00:40:55] compensation down to 10.25
[00:40:57] so that's the basics of adding a
[00:40:59] material to our world what if we want to
[00:41:00] create or edit a material well to create
[00:41:03] a material is also pretty simple it's
[00:41:04] just like creating a level press control
[00:41:06] and space and come into my stuff where
[00:41:08] we're going to create our material right
[00:41:10] click and under create basic assets
[00:41:12] select material and let's call this
[00:41:14] first
[00:41:16] material and press enter and double
[00:41:18] click on it to open up the material
[00:41:20] editor first off before we go over any
[00:41:23] of these settings you'll notice that my
[00:41:24] window is right now floating so
[00:41:26] something I like to do with all my
[00:41:28] editor Windows is to hold down the left
[00:41:30] Mouse button on the tab and then dock it
[00:41:32] up here just like this that's how really
[00:41:35] quickly I could switch in between my
[00:41:37] main level View and any of my editor
[00:41:40] views so in the middle we have the
[00:41:42] material graph essentially what the
[00:41:45] material graph does is basically we have
[00:41:47] a bunch of nodes that connect to each
[00:41:48] other and their end goal is to
[00:41:50] eventually be outputed into one of these
[00:41:53] outputs right here which will create the
[00:41:55] actual material now the controls are
[00:41:58] pretty similar to the controls of our
[00:42:00] viewport when in orthographic View mode
[00:42:02] so hold down the right Mouse button to
[00:42:05] pan and then use a scroll wheel to zoom
[00:42:07] in and out so right Mouse button pan
[00:42:09] scroll wheel zoom in and out you can
[00:42:11] select nodes by just clicking on them or
[00:42:14] holding down the left Mouse button to
[00:42:16] Marquee select now to the left right
[00:42:18] here is the viewport if you hold down
[00:42:20] the left Mouse button you can pan around
[00:42:22] this preview mesh right here which helps
[00:42:24] us see our material when we're editing
[00:42:26] it now we can change the preview mesh
[00:42:28] down here so maybe you want to use a
[00:42:30] cylinder or a flat plane a square but
[00:42:34] for now I'm just going to keep it at a
[00:42:35] sphere and right below that is the
[00:42:37] details panel so if we select a node
[00:42:40] we're able to edit that node's
[00:42:41] properties right here in the details
[00:42:42] panel so how do we create a node well we
[00:42:45] come all the way over here to the pallet
[00:42:47] click on it and now we have a selection
[00:42:49] of all the different nodes we can use to
[00:42:52] create a material we can also rightclick
[00:42:54] anywhere to get that same pallet so
[00:42:57] under pallets I want a constant 3 Vector
[00:43:00] under constants the reason why is
[00:43:02] because a constant 3 Vector is
[00:43:04] essentially unreal's version of color
[00:43:06] it's r g and B for red green and blue
[00:43:10] right now this node is set to Black I
[00:43:12] could edit it by coming to the details
[00:43:13] panel and double clicking on the color
[00:43:15] to get a Color Picker or I can double
[00:43:17] click on the Note itself to get that
[00:43:19] color wheel so notice how when I do
[00:43:22] change the color right here there are no
[00:43:24] changes that's because its value is set
[00:43:26] to zero I can bring up up its value by
[00:43:28] clicking on this rectangle right here so
[00:43:31] now when I change this color we notice
[00:43:33] that color changing and when I do like a
[00:43:36] color I want to confirm that this node
[00:43:39] is going to stay that color by clicking
[00:43:41] okay so now we have our first node with
[00:43:44] a new color essentially if I hover over
[00:43:48] this pin right here and hold down the
[00:43:49] left Mouse button I'm able to drag out a
[00:43:51] wire and I can choose where I want to
[00:43:53] place those wires in any of the inputs
[00:43:56] right here now of course because this is
[00:43:58] a color it should probably go into base
[00:44:00] color so with my left Mouse button still
[00:44:02] held down I'm going to hover over the
[00:44:05] base color pin and let go to connect it
[00:44:08] now we can see that our color is
[00:44:11] affecting our material so let's see what
[00:44:13] this looks like in our level so press
[00:44:16] control and space and let's drag first
[00:44:18] material onto the sphere and notice that
[00:44:20] there are no changes right now this
[00:44:23] looks like the default material and
[00:44:25] that's because we first need to compile
[00:44:27] our material after we make any changes
[00:44:29] to see that change in our level so go to
[00:44:31] First material and to compile a material
[00:44:34] you want to click on the apply button
[00:44:36] and also while we're at it let's save it
[00:44:38] so if unreal crashes we don't lose our
[00:44:40] progress now if we come back to our
[00:44:42] level we can see that change took effect
[00:44:45] now jumping back into first material if
[00:44:47] we let's say change the color to a light
[00:44:49] blue jump back into our level we see
[00:44:52] that there were no changes because we
[00:44:53] need to make sure after we edit a
[00:44:55] material that we compile it with the the
[00:44:57] apply button and now we see that light
[00:44:59] blue that's how you add color now what
[00:45:02] if you want to edit how shiny or
[00:45:03] reflective the material is well on our
[00:45:06] first material instead of editing the
[00:45:08] base color we're now going to edit the
[00:45:10] roughness channel right here and
[00:45:12] roughness doesn't take a color value of
[00:45:14] course instead it takes a scalar value
[00:45:17] in between 0er and one so zero means
[00:45:19] it's really smooth and one means it's
[00:45:21] really rough to get a scalar value you
[00:45:24] want to come up to pallet and under
[00:45:27] constant select the constant one value
[00:45:29] left Mouse button hold and drag it out
[00:45:31] and now we get a node that is simply a
[00:45:34] number so zero will be smooth one will
[00:45:37] be rough let's make this really smooth
[00:45:39] by giving it a value of
[00:45:41] 0.1 and simply left Mouse button hold
[00:45:43] and drag it into roughness if for some
[00:45:46] reason you ever want to break a wire all
[00:45:48] you have to do is hold down alt and
[00:45:50] hover over any of these pins and left
[00:45:53] click so alt and left click to break any
[00:45:55] pins and we will not see this change in
[00:45:58] our level unless we press apply so
[00:46:01] jumping back into materials I'm going to
[00:46:03] press F and hold down alt and left Mouse
[00:46:05] button to then pivot around my material
[00:46:09] while it's nice reflective values notice
[00:46:12] how we can see all the different clouds
[00:46:14] in the sky being reflected off the
[00:46:16] material now so that's roughness but
[00:46:18] what if we want to make our material
[00:46:19] metallic well go back into first
[00:46:21] material and this is where the metallic
[00:46:24] input comes in really handy so we need
[00:46:26] another constant vector and we could get
[00:46:29] it by selecting that node and pressing
[00:46:31] contrl and D to duplicate it or I can
[00:46:35] get it from the pallet and of course I
[00:46:38] can rightclick and simply type in
[00:46:40] constant so normally when I am getting
[00:46:42] nodes in I just right click and type in
[00:46:45] the name of the node and press enter to
[00:46:47] bring it in so I'm going to give this a
[00:46:49] value right now of one since by default
[00:46:52] there is no metallic value it's set to
[00:46:54] zero so send it to one
[00:46:57] and plugging it into metallic will make
[00:46:59] this blue pretty metallic and in fact
[00:47:02] let's go change the color to something
[00:47:03] orangey press apply and now we made a
[00:47:07] gold material it's very important to
[00:47:10] point out that unroll engines material
[00:47:12] system is based off of physically based
[00:47:14] rendering or PBR for short for example
[00:47:18] right now I have a project open up to
[00:47:19] demonstrate PBR values and the two main
[00:47:22] ones to know about are metallic and
[00:47:24] roughness we've already played with them
[00:47:26] and essentially for them are on a scale
[00:47:28] from 0 to 1 Now by default metallic is
[00:47:30] set to zero so there is no metallic on
[00:47:33] the material and our roughness is set to
[00:47:36] 0.5 now as I bring down the roughness we
[00:47:39] see our material get shinier and shinier
[00:47:42] and then if I bring it up our material
[00:47:44] gets rougher and rougher so if I bring
[00:47:46] it all the way down to zero and play
[00:47:47] with the metallic value which is right
[00:47:49] now as default value of zero so it's not
[00:47:51] metallic but slowly we can see it goes
[00:47:53] from a plastic material all the way to a
[00:47:57] very shiny gold material and if we play
[00:47:59] with a roughness value we can really see
[00:48:01] those changes taking effect now both
[00:48:04] these values are clamped from 0 to 1 so
[00:48:06] let's say if we input a roughness value
[00:48:08] of negative 1 then it'll be clamped to
[00:48:10] zero or if we go above one then it's
[00:48:13] going to clamp it down to just one so
[00:48:15] keep that in mind that if you do try to
[00:48:17] input a value that's outside the 0 to1
[00:48:19] range you won't see any changes and it's
[00:48:23] important to point out that generally
[00:48:25] for metallic values we never go in
[00:48:27] between 0 and 1 you won't really see a
[00:48:30] material that's 0.5 metallic instead
[00:48:32] materials are either all the way zero or
[00:48:35] all the way one here I am back in our
[00:48:37] original project and you notice that we
[00:48:39] no longer have our material opened up
[00:48:41] here well that's fine you can always
[00:48:43] open up the material on any object by
[00:48:45] clicking on that object and then in the
[00:48:47] details panel we see all the materials
[00:48:49] that are currently on top of that object
[00:48:51] so just double click to open up our
[00:48:53] original material we created
[00:48:55] alternatively you'll a little magnifying
[00:48:57] icon right there if I select that then
[00:49:00] it's automatically going to jump to that
[00:49:01] materials location in our content drawer
[00:49:04] and we can double click to open it up
[00:49:05] right there like that so the PBR sliders
[00:49:08] we were just playing with are the
[00:49:10] metallic and roughness values right here
[00:49:12] so those sliders correspond with these
[00:49:14] values so hopefully you understand
[00:49:16] exactly what they do now now I'm going
[00:49:18] to make a slight edit so for metallic
[00:49:21] let's brein it from one to its default
[00:49:23] value of zero so that's how it's kind of
[00:49:25] like a plastic material right now and
[00:49:28] also I think it's a little bit too
[00:49:29] bright so double clicking on the color
[00:49:32] I'm able to decrease the brightness by
[00:49:34] playing with its value so bring it down
[00:49:37] a little bit press okay press apply and
[00:49:39] now I do think we have a nice material
[00:49:42] but normally when you have plastic
[00:49:43] outside it wouldn't be this uniformly
[00:49:46] shiny you would expect dirt to pile on
[00:49:48] this material and make some areas of the
[00:49:50] material rougher than others so let's
[00:49:52] jump into first material and to add a
[00:49:55] texture press contr and space let's go
[00:49:58] into starter content since starter
[00:50:00] content comes with a bunch of textures
[00:50:02] under the textures folder and the
[00:50:04] texture I want to use is specifically
[00:50:07] tore pein noise so to get a texture into
[00:50:10] your material simply left Mouse button
[00:50:12] hold drag it in and let go like that
[00:50:15] alternatively you can rightclick type in
[00:50:18] texture sample select that and then
[00:50:22] within the details panel in the drop
[00:50:24] down of texture go ahead and find
[00:50:26] whatever texture you want to use and
[00:50:28] select it so that's alternative way to
[00:50:31] add in a texture and now that we have
[00:50:33] tore pein noise if we open it up we can
[00:50:36] see that it's just black and white all
[00:50:38] the pixels of the texture represent a
[00:50:40] value in between 0 and one so they are
[00:50:43] perfect to plug into either metallic or
[00:50:45] roughness plug our texture into
[00:50:47] roughness since I wanted to drive the
[00:50:49] roughness value of our material and
[00:50:52] delete the old node Since I no longer
[00:50:53] need it press apply chop back and turn
[00:50:56] material example and now if I angle it
[00:50:59] with the sun and here's a nice tip if I
[00:51:01] hold down control and L at the same time
[00:51:03] I'm able to rotate that Sun so I'm able
[00:51:06] to bring it down like move it around and
[00:51:10] see what our material looks like in
[00:51:12] different lighting
[00:51:13] scenarios and right now our material is
[00:51:15] looking a lot more realistic we can see
[00:51:19] that because of our material all the
[00:51:22] black spots represent shiny areas and
[00:51:24] all the white spots represent rough
[00:51:26] areas
[00:51:27] which gives our material a nice smudgy
[00:51:29] look to it to just break up that uniform
[00:51:32] shininess at this point let's switch up
[00:51:35] the colors since if I go into color mode
[00:51:37] by going alt three for unlit we can see
[00:51:40] that's still all one uniform color
[00:51:42] pressing alt four to go back into lip
[00:51:44] mode I want it where all the smudges are
[00:51:47] a different color that's a little bit
[00:51:49] more Brown than orange to represent dirt
[00:51:52] so let's go back into first material and
[00:51:55] we can duplicate this by pressing
[00:51:56] control and D or we can right click and
[00:52:00] type in constant 3 vector and select
[00:52:03] that so double click on this I'm going
[00:52:06] to give it a brownish color maybe like
[00:52:10] right here press okay and now I want to
[00:52:12] lurp in between the orange color and the
[00:52:16] brown color depending on our Alpha
[00:52:18] texture so wherever there's white I
[00:52:21] wanted to pick Brown and whenever
[00:52:23] there's black I wanted to pick orange
[00:52:26] and we can do do this through a linear
[00:52:27] interpolate node so right click type in
[00:52:30] linear and then interpolate select that
[00:52:33] or a shortcut is to hold down the L key
[00:52:36] and left click so L left click brings in
[00:52:39] the lurp node since we are going to be
[00:52:40] using that Noe a lot and on the subc of
[00:52:42] hot keys if I hold down three and left
[00:52:44] click that gives us a constant three
[00:52:46] Vector for color or if I hold down one
[00:52:49] and left click that gives us a basic
[00:52:51] scalar value like for metallic and
[00:52:54] roughness so one and left click for
[00:52:56] scalar value three and left click for
[00:52:59] color so let's plug this up to a plug
[00:53:02] the brown one to B and for Alpha texture
[00:53:05] I want it to lurp depending on our
[00:53:07] original mask that's right now driving
[00:53:09] our roughness so drag RGB into Alpha and
[00:53:13] drag that all into base color and now we
[00:53:16] can see that where our object is in
[00:53:19] shiny the color changes to a dirty Brown
[00:53:23] pressing apply jumping back in here we
[00:53:26] notice that our material is definitely a
[00:53:29] lot more realistic you can imagine that
[00:53:32] this was once plastic or really shiny
[00:53:34] paints and over time Dirt has slowly
[00:53:37] started to build up on the material
[00:53:39] making it pretty dirty now we can make
[00:53:42] this even better by instead of luring in
[00:53:44] between two colors we're luring in
[00:53:46] between a color and another texture so
[00:53:49] there's a very good texture under
[00:53:50] starter content textures and it is right
[00:53:53] here so it's tore metal rust open this
[00:53:56] up we can see what it is but right now
[00:53:58] we don't notice anything that's because
[00:54:00] the alpha channel is turned on and the
[00:54:02] alpha Channel handles opacity so if you
[00:54:04] ever open up a texture and you don't see
[00:54:06] anything make sure you come up to a and
[00:54:08] uncheck that so now we can see it and
[00:54:11] while this is rust I do think it
[00:54:13] functions well as dirt especially for
[00:54:15] very small detail like on this material
[00:54:18] it's going to be hard to tell that this
[00:54:19] is rust instead of dirts so let's drag
[00:54:22] this onto our material graph and plug it
[00:54:25] up right there in instead of the
[00:54:26] original dirt and press apply so
[00:54:29] congratulations you just made your first
[00:54:31] material in Unreal Engine 5 while it's
[00:54:33] not the best it definitely is a good
[00:54:34] introduction to the power of the
[00:54:36] material graph before we continue we
[00:54:38] first have to download some free assets
[00:54:40] I created for this tutorial to help us
[00:54:43] learn on real engine you can find a link
[00:54:45] to download the free Assets in the
[00:54:47] description of this video the reason why
[00:54:49] is because in this section we're going
[00:54:51] to go over how we can take a texture and
[00:54:54] import that texture into un real engine
[00:54:56] and use it in one of our materials so to
[00:54:59] begin I've already downloaded the assets
[00:55:01] for this tutorial right here in unreal
[00:55:04] 5. zip double click to go inside of it
[00:55:07] and double click to go into intro unreal
[00:55:09] 5 so I want to make sure that I do unzip
[00:55:11] some of these assets specifically the
[00:55:13] beginner assets folder to unzip it
[00:55:15] simply drag it onto our desktop we are
[00:55:17] going to go over Castle assets and intro
[00:55:19] on real project in just a bit but for
[00:55:22] now we don't need these so I'm going to
[00:55:23] exit out my zip folder and now we have a
[00:55:26] brand new folder with a bunch of assets
[00:55:29] we're going to import into on real
[00:55:30] Engine 5 so to begin we're going to
[00:55:32] create a very simple material using
[00:55:34] these three textures right here you can
[00:55:36] probably guess that Spanish payment
[00:55:38] color handles the color of the texture
[00:55:40] Spanish payment roughness handles how
[00:55:41] rough the texture is and the normal map
[00:55:44] which is this purple texture while it
[00:55:46] does look pretty weird don't worry we
[00:55:48] are going to go over what a normal map
[00:55:50] is in just a second but for now let's go
[00:55:53] import all three of these into unreal 5
[00:55:57] so let's open up content drawer and go
[00:55:59] into my stuff because you remember we
[00:56:01] created a folder called my stuff to hold
[00:56:02] all our assets and I'm going to hold
[00:56:04] down my left Mouse button and drag all
[00:56:07] these assets into my content drawer so
[00:56:09] you want to make sure that your content
[00:56:10] drawer is open so you are able to drag
[00:56:13] it in let go and automatically these
[00:56:17] three textures have imported so we'll
[00:56:19] notice that all three of these textures
[00:56:21] have little asteris right there that
[00:56:22] tells us that these textures need to be
[00:56:24] saved so select all them and press c
[00:56:26] contrl s or we could have clicked on
[00:56:28] save all so if I double click on Spanish
[00:56:30] base color we can see that the texture
[00:56:32] has successfully been imported into
[00:56:34] Unreal Engine 5 and srgb is turned on
[00:56:37] for color textures we want to make sure
[00:56:39] srgb is turned on for everything else
[00:56:41] such as masks and normal Maps we want
[00:56:44] srgb turned off for Spanish payment
[00:56:46] roughness we see that's turned on I'm
[00:56:48] going to check this to false and save it
[00:56:52] now for our normal map if I double click
[00:56:54] on the normal map unreal is smart enough
[00:56:56] to know that this is a normal map so it
[00:56:58] already automatically sets some of the
[00:57:00] parameters srgb is turned off which is
[00:57:02] what we want and compression setting is
[00:57:04] set to normal map now if you do import a
[00:57:06] normal map and unreal doesn't know it's
[00:57:08] a normal map then you want to make sure
[00:57:10] that you set pressure settings to normal
[00:57:11] map and srgb turned off so let's go
[00:57:14] create our material by right clicking go
[00:57:17] to materials call one
[00:57:18] mcore Spanish payment now you do not
[00:57:22] have to add the mcore in front of our
[00:57:24] name but just for convention like to add
[00:57:26] M underscore over all of my materials to
[00:57:29] tell me just by quickly reading the name
[00:57:32] of the asset that this is a material so
[00:57:34] double click to go into mcor span
[00:57:36] payment and let's dock it up here so we
[00:57:39] can switch in between our level and our
[00:57:41] material graph now I'm going to press
[00:57:43] control and space and I could drag in
[00:57:45] each texture individually or I can hold
[00:57:48] down shift and select all of them and
[00:57:51] drag in all of them at once so I'm going
[00:57:54] to leave my normal map off to the side
[00:57:56] since we are going to go over this in a
[00:57:58] bit but let's just handle our roughness
[00:58:01] and our base color so base color we go
[00:58:03] into of course base color and roughness
[00:58:06] will go into roughness now we don't have
[00:58:08] to play with a metallic value because
[00:58:10] metallic by default is set to zero
[00:58:13] because our material is a metallic we
[00:58:16] can leave the metallic input empty since
[00:58:18] it will just default to
[00:58:20] zero and within material example level
[00:58:23] let's apply this brand new material to
[00:58:25] our FL floor right away I notice that
[00:58:28] there are two issues with a material
[00:58:30] number one our material is tiling way
[00:58:31] too much it's too small and number two
[00:58:34] there is no depth there is no Shadows
[00:58:36] given by the crevices of our Spanish
[00:58:39] pavment it's almost as if someone got
[00:58:41] wallpaper and plastered it onto the
[00:58:44] floor trying to pretend like it's real
[00:58:45] flooring so to fix this we use normal
[00:58:48] Maps so essentially what normal Maps do
[00:58:50] is that they fake bumps so they fake
[00:58:53] depth and they make it look like our
[00:58:55] texture actually has height when in
[00:58:57] reality it doesn't it's just a material
[00:58:59] so to add a normal map it's pretty
[00:59:01] simple as you can probably guess we grab
[00:59:03] the normal map and simply drag it into
[00:59:07] normal so let's press apply and
[00:59:09] immediately we'll see that our texture
[00:59:11] looks a lot better there's actual depth
[00:59:14] and if we come to the shadow right here
[00:59:17] and add in a basic light we can see that
[00:59:20] as I move this light around the material
[00:59:23] itself is casting Shadow so since the
[00:59:25] light is right here now the crevices
[00:59:28] have a little bit of a shadow so normal
[00:59:30] Maps really go a long way to make our
[00:59:33] material look really realistic now let's
[00:59:36] fix our tiling because in my opinion I
[00:59:38] think it's tiling way too much right now
[00:59:40] and to fix tiling let's go into M
[00:59:43] Spanish payment and we're going to use a
[00:59:45] brand new node so right click type in
[00:59:48] texture coordinates so let's grab that
[00:59:51] essentially texture coordinates will
[00:59:52] allow us to change the scale of our
[00:59:54] textures so if we just drag it into UVS
[00:59:58] nothing will happen that's because we
[00:59:59] need to hold down M and left click to
[01:00:02] add in a multiply nodee or we can right
[01:00:05] click and type in multiply since we are
[01:00:08] going to be multiplying the value that
[01:00:09] comes out of texture coordinates and on
[01:00:11] a side note if you ever want to break
[01:00:13] wires hold down alt and left Mouse
[01:00:16] button to break it so let's move
[01:00:18] multiply up here like this hold down the
[01:00:21] left Mouse button and drag it into a and
[01:00:24] then drag this out into the
[01:00:27] UVS just like this we can multiply this
[01:00:30] by a number which is a constant scalar
[01:00:33] so as you can guess we're going to type
[01:00:35] in constant and grab one constant so
[01:00:39] plug this into B and let's give this a
[01:00:42] value of instead of one something
[01:00:45] smaller like
[01:00:47] 0.5 and this will increase the size of
[01:00:50] our texture to make our Spanish payment
[01:00:52] bigger and we can see immediately that
[01:00:54] it did make the texture bigger
[01:00:56] we can maybe even make this a little bit
[01:00:58] bigger let's try 0.35 and press apply
[01:01:01] and now I do like the scale of our
[01:01:02] payment we can also add in a little bit
[01:01:04] of customization so maybe I don't like
[01:01:07] the tint of this I want to make our
[01:01:09] payment a little bit more red or a
[01:01:10] little bit more green well I can Marquee
[01:01:13] select by holding down the left Mouse
[01:01:15] button anywhere My Graph select all my
[01:01:17] nodes move it back a bit since we're
[01:01:20] going to be adding some nodes right here
[01:01:22] so I'm G to hold down M and left click
[01:01:24] again to add in the multiply node and
[01:01:26] drag RGB into it like this and then drag
[01:01:29] it out into base color I actually want
[01:01:32] this RGB to go into B not a so I could
[01:01:35] hold down control and hold down my left
[01:01:37] Mouse button to then grab this wire and
[01:01:40] place it into B to just switch it from A
[01:01:42] to B now I'm going to hold down three
[01:01:44] and left click to add in a constant
[01:01:47] three vector and I'm going to say
[01:01:49] default value to White and plug this
[01:01:51] into a so since RG and B are all 111
[01:01:55] there's going to be no changes right now
[01:01:57] with a Spanish payment but if I want to
[01:01:59] make a Spanish payment a little bit more
[01:02:00] red instead of it being white I'm going
[01:02:02] to move it into the red Direction and
[01:02:05] press apply we can already see a change
[01:02:07] right there and now our Spanish pavement
[01:02:09] is really red so generally you don't
[01:02:11] want the tint to be that intense so just
[01:02:13] a little bit red kind of like an off
[01:02:16] white and then press apply now we do
[01:02:19] have a more reddish payment or we can
[01:02:22] even add some greenish
[01:02:24] blue and
[01:02:26] we subtract a lot of red from our
[01:02:28] Spanish pavement and maybe you do like
[01:02:29] the look of this better right now our
[01:02:32] material looks nice but there is one big
[01:02:34] issue and that is it is not real time so
[01:02:37] whenever we make a slight adjustment we
[01:02:39] have to press apply and wait for it to
[01:02:40] compile in order to see changes in our
[01:02:43] world and as you can imagine if we have
[01:02:45] a really complex material and we make a
[01:02:47] slight change the Gile time can take a
[01:02:50] while so we're able to get around this
[01:02:52] with parameters so parameters allow us
[01:02:55] to make real real time adjustments
[01:02:57] without any compile time whatsoever so
[01:03:00] let's jump into it to show how to use
[01:03:02] them before we create a parameter we
[01:03:04] first need to create a material instance
[01:03:06] and this material instance will hold all
[01:03:08] of our parameters so to create a
[01:03:10] material instance is pretty easy first
[01:03:12] you want to find the material you want
[01:03:13] to create an instance of in our case
[01:03:15] it's a Spanish payment we already have
[01:03:17] the location open up within our content
[01:03:19] drawer but just as a reminder if you
[01:03:21] want to find exactly where this material
[01:03:22] is Select object with the material on it
[01:03:25] and within the details panel select the
[01:03:28] little magnifying glass to jump to that
[01:03:29] location in your content drawer so here
[01:03:32] we have M Spanish payment and to create
[01:03:34] a material instance simply right click
[01:03:36] on your material and go create material
[01:03:38] instance now instead of calling it m
[01:03:41] Spanish payments I'm going to call it
[01:03:43] miore Spanish payments so I like to use
[01:03:46] an m to tell me that this asset is a
[01:03:48] material and I like to use Mi to tell me
[01:03:50] that this asset is a material instance
[01:03:52] so let's double click to go into the
[01:03:54] material instance and we'll see that we
[01:03:56] don't have any parameters right now a
[01:03:58] parameter is essentially a setting that
[01:04:00] allows us to change our material and
[01:04:03] that's because I need to tell unreal
[01:04:05] exactly what settings within our
[01:04:06] material I want to make a parameter what
[01:04:10] variables I want to expose to the
[01:04:11] material instance so for example if I
[01:04:15] want to make this value right here a
[01:04:17] parameter right click and go to convert
[01:04:20] to parameter it's that easy now it's
[01:04:21] going to ask for a name let's call this
[01:04:23] one size and now within our our material
[01:04:26] instance we noticed that there was no
[01:04:27] change because I have to press apply and
[01:04:31] now we get a brand new parameter within
[01:04:32] our material instance called size now
[01:04:35] before we can play with this let's go
[01:04:37] add our material instance to our world
[01:04:39] since the Spanish payment is not our
[01:04:41] material instance instead it's mcore
[01:04:43] Spanish payments so let's go grab our
[01:04:45] material instance and drag it on there
[01:04:47] to make it the instance and not the main
[01:04:49] material now with our material instance
[01:04:51] opened I'm going to check size and let's
[01:04:55] go play with this value so I can see
[01:04:57] that as I increase it it's all updating
[01:05:00] in real time and as I decrease it I'm
[01:05:03] able to see exactly the size that I want
[01:05:07] so trying to pick a size this way
[01:05:10] instead of having to jump into our
[01:05:12] material manually edit something and
[01:05:14] then click apply and jump back by just
[01:05:17] exposing it as a parameter for our
[01:05:18] material instance it makes creating
[01:05:20] materials a lot easier and in my opinion
[01:05:22] a lot more fun now we're not just
[01:05:24] limited to creating parameters for
[01:05:25] scalar values we can even go into M
[01:05:28] Spanish payment and let's turn this
[01:05:30] color into a parameter so call this one
[01:05:33] color tint and let's go back into
[01:05:35] material example and we do not have
[01:05:38] anything because I forgot to press
[01:05:40] apply and this color tint is available
[01:05:43] to us so maybe I don't want it to be
[01:05:46] this kind of greenish I just want to
[01:05:48] bring it over to let's
[01:05:50] do actually let's make it even more
[01:05:52] green like this I can even bring down
[01:05:54] the value to make it pretty much no
[01:05:56] color just pure black so we can even
[01:05:59] give ourselves more control for example
[01:06:02] right now our normal map is doing a
[01:06:04] pretty good job but what if we want to
[01:06:05] decrease the effect of the normal map or
[01:06:08] we want to make this normal map even
[01:06:09] more intense so that the Shadows are
[01:06:10] more pronounced well if we jump into
[01:06:12] mcore Spanish payment we can control the
[01:06:14] intensity of a normal map with the
[01:06:16] flatten normal node so let's go hook up
[01:06:20] the normal map to normal right there and
[01:06:22] the result to normal now it's asking for
[01:06:24] a flatness value if i h my mouse over it
[01:06:26] it says the default value is zero so I'm
[01:06:28] going to hold down one and left click to
[01:06:30] create a constant scalar value and hook
[01:06:33] it up right there now I'm going to right
[01:06:35] click and go convert to parameter and
[01:06:38] let's call this one normal flatness just
[01:06:42] like that so zero won't do anything
[01:06:45] press apply jump back into our
[01:06:48] world and check normal flatness zero is
[01:06:52] its default there are no changes but if
[01:06:54] I increase normal flatness our normal
[01:06:57] strength decreases because it's getting
[01:07:00] more and more flat but if I make this
[01:07:03] value go below zero so into the negative
[01:07:06] ranges like negative 1 then we have some
[01:07:10] really intense normal Maps maybe even
[01:07:12] let's Gog five now this is almost like
[01:07:15] it's from a war zone we can even add
[01:07:17] some more adjustments so let's jump back
[01:07:20] into M SC Spanish payment and I want to
[01:07:22] control the intensity of this normal map
[01:07:24] with just a simple multiply node so I
[01:07:27] could select this multiply press contrl
[01:07:29] and D to duplicate it or I could hold
[01:07:31] down M and left click to bring in a
[01:07:33] multiply node and hook it up like this
[01:07:37] now I want to bring in a parameter
[01:07:39] scalar value for B so I could hold down
[01:07:42] one and left click then right click to
[01:07:44] convert to parameter or a shortcut is to
[01:07:47] hold down the S key and left click to
[01:07:49] create a constant parameter and it's
[01:07:51] going to automatically ask us for a name
[01:07:53] call us want roughness
[01:07:56] strength and plug it up like this and
[01:07:59] this will immediately get rid of any
[01:08:00] roughness make it pure glossy we don't
[01:08:03] want that so let's go increase the
[01:08:05] strength from 0o to one which won't do
[01:08:07] anything by default but this gives us
[01:08:10] the ability within our material instance
[01:08:13] to then let's say increase this
[01:08:16] roughness
[01:08:17] strength to make our payment even more
[01:08:20] rough so maybe beforehand it was at one
[01:08:23] you think that this is a little bit too
[01:08:25] shiny well you can just increase it and
[01:08:29] get the exact roughness amount you want
[01:08:32] so with just a couple of controls within
[01:08:34] our parameter value we're able to in
[01:08:36] real time completely change the way our
[01:08:39] material looks which is pretty
[01:08:43] amazing now I prefer the way this
[01:08:47] material looked like originally so I can
[01:08:49] reset all the values to its default
[01:08:51] value by clicking on the Arrow icon so
[01:08:53] set that to zero 1
[01:08:57] 0.35 and set it back to a little bit off
[01:08:59] green now that we know how to create
[01:09:01] material instances it's now time to go
[01:09:03] over Master materials essentially a
[01:09:06] master material is one material to rule
[01:09:08] them all so imagine we have a single
[01:09:11] material and from this material a bunch
[01:09:13] of material instances are created that
[01:09:15] are very different from each other these
[01:09:17] instances can be anything from paint
[01:09:20] concrete wood pretty much anything you
[01:09:22] can imagine and they all share the exact
[01:09:25] say master material so I know what he
[01:09:28] just said sound a little bit complicated
[01:09:30] but it's best to show with an example
[01:09:33] we've already done a lot of the work
[01:09:34] Crea a master material and it's actually
[01:09:36] mcore Spanish payments so we're going to
[01:09:39] turn this into a generic material from
[01:09:41] which we can create multiple materials
[01:09:42] from so let's jump back into our map and
[01:09:45] within the content drawer instead of
[01:09:47] calling this mcore Spanish payment let's
[01:09:49] right click and go rename and call 1more
[01:09:52] Master material
[01:09:55] just like that so let's double click on
[01:09:57] it and I want to make this master
[01:10:00] material pretty generic so I want all my
[01:10:02] parameters to have the default values
[01:10:04] where if I didn't edit any of them it
[01:10:06] would basically be the same as if we
[01:10:08] plugged in all three of these textures
[01:10:10] without any of those edits so down here
[01:10:13] normal flatness won't make any edits or
[01:10:15] changes to the normal map which is what
[01:10:16] we want normal strength is right now set
[01:10:19] to one which will not change the
[01:10:21] roughness map or make it more rough or
[01:10:23] more shiny also I notice I misspelled
[01:10:26] strength so let's go fix that and up
[01:10:29] here color tint isn't Pure White if it
[01:10:31] was Pure White then it wouldn't edit the
[01:10:33] base color but it's an off green right
[01:10:35] now so I want to make this Pure White
[01:10:37] let's double click on this and I can do
[01:10:39] so by grabbing the saturation and bring
[01:10:42] it all the way down like that so now we
[01:10:44] have 11 one one and make sure your value
[01:10:47] right here is all the way up to the top
[01:10:49] like that now we have Pure White which
[01:10:52] isn't making any edits to the base color
[01:10:54] now we are making an edit to the
[01:10:56] multiply node right here so this is a
[01:10:59] size of 0.35 so it's going to decrease
[01:11:01] the tiling and make our texture a lot
[01:11:04] bigger than what it would be by default
[01:11:06] so I need to set this to its default of
[01:11:08] one right there so let's press
[01:11:11] apply and as a reminder if I open up
[01:11:14] miore Spanish payments essentially by
[01:11:17] changing the values within the master
[01:11:19] material in a material instance we see
[01:11:21] size right here is 0.35 to change it to
[01:11:25] it default all you have to do is click
[01:11:26] on the Arrow like that so for color tint
[01:11:29] it's right now green which is what it
[01:11:30] was originally if I click on the Arrow
[01:11:32] now it's pure white so let's go back and
[01:11:36] I also want to expose the textures right
[01:11:38] here so I want to be able to swap out
[01:11:40] each of these textures on the material
[01:11:42] instance to do so you can probably guess
[01:11:45] of course we're going to right click and
[01:11:46] go to convert to parameter call this one
[01:11:49] color right click right
[01:11:52] here
[01:11:53] roughness and right click con convert to
[01:11:57] parameter
[01:11:58] normal so let's press apply and now we
[01:12:02] get access to all those textures right
[01:12:05] here so if I just turn and activate all
[01:12:07] of these I can switch out any of these
[01:12:10] textures for something else for example
[01:12:12] I can switch it out with grass and now
[01:12:14] we have grass as our base color but our
[01:12:16] roughness is still using the Spanish
[01:12:18] payment and the normal map so I'm going
[01:12:20] to press contrl and Z to get rid of that
[01:12:22] but you can imagine that if we did have
[01:12:23] a normal map for grass and a roughness
[01:12:25] for grass that I can just swap it out
[01:12:27] really quickly and instead of it being a
[01:12:29] span payment it is now grass but our
[01:12:32] Master material isn't complete yet it is
[01:12:34] missing one function and that is
[01:12:37] allowing for metallic Maps since our
[01:12:39] Spanish payment right now isn't metallic
[01:12:41] but what if we did have a metallic
[01:12:43] material and we want to use our Master
[01:12:45] material unfortunately there is no place
[01:12:47] that we can put a metallic map so let's
[01:12:49] jump into mare Master material and let's
[01:12:52] add that right here so we're just going
[01:12:54] to do duplicate the roughness map so
[01:12:56] press crl c contrl v because just like
[01:12:59] the roughness map the metallic map is a
[01:13:01] mask that shows where in the texture the
[01:13:04] material should be
[01:13:05] metallic and instead of calling a
[01:13:07] roughness call this one
[01:13:09] metallic drag it up right here that's I
[01:13:12] was using the same UVS and simply plug
[01:13:14] this into metallic now we do have the
[01:13:17] issue and that is now even a material
[01:13:19] like our Spanish payment which is a
[01:13:21] metallic will have metallic values by
[01:13:24] default which is something we don't want
[01:13:26] so we want the ability to be able to
[01:13:27] turn on and off this metallic map right
[01:13:29] here so let's jump into mcore Master
[01:13:32] material and we can give ourselves a
[01:13:34] toggle for this with the static switch
[01:13:38] parameter and select it right there so
[01:13:40] let's call this one is metallic and then
[01:13:44] if it is then we're going to use the
[01:13:46] metallic map but if it's not we're going
[01:13:49] to use the default value of metallic
[01:13:51] which is just zero so hold on one and
[01:13:53] left click to in a constant scalar value
[01:13:57] and by default it is zero so plug it up
[01:13:59] like
[01:14:00] this and now we have a nice switch where
[01:14:04] let's say for example if we do have a
[01:14:06] metallic material all we have to do in
[01:14:08] the material instance is check is
[01:14:11] metallic the true and drag in that
[01:14:13] metallic map right here but if I turn it
[01:14:15] off then it gets rid of that metallic
[01:14:17] map so let me go make some adjustments
[01:14:19] to our Spanish payment bring down the
[01:14:22] size also it's a little bit too
[01:14:25] reflective right now so I'm going to
[01:14:27] increase the roughness strength just a
[01:14:29] little
[01:14:29] bit to make it a little bit less shiny
[01:14:33] and now we have a pretty versatile
[01:14:35] Master material that we can use for a
[01:14:37] whole range of different scenarios and
[01:14:39] we're going to use this master material
[01:14:41] in the next chapter now that we can
[01:14:43] import textures and have a master
[01:14:45] material let's go over how we can import
[01:14:47] 3D objects and bring them into Unreal
[01:14:50] Engine and it's very important to know
[01:14:52] that in Unreal Engine 3D objects are
[01:14:54] called stat static meshes and static
[01:14:57] meshes by itself are just a collection
[01:15:00] of vertices and faces in space if you
[01:15:02] want to change the way that object looks
[01:15:04] then we need to add on a material and
[01:15:07] generally this material is comprised of
[01:15:09] multiple textures so to break down how a
[01:15:12] 3D asset is constructed in Unreal Engine
[01:15:15] first we have our static mesh which is a
[01:15:18] plain 3D object and then to change the
[01:15:20] way that static mesh looks we need to
[01:15:22] add a material and this material can be
[01:15:25] comprised of multiple textures so to
[01:15:28] better get a sense of how 3D assets are
[01:15:30] made Let's create our own 3D asset in
[01:15:33] Unreal Engine the 3D object we're going
[01:15:35] to be importing into Unreal Engine right
[01:15:37] now is included within the beginner
[01:15:39] assets so double click to open this up
[01:15:42] and it's the wood crate. fpx so we're
[01:15:44] going to import this into un real engine
[01:15:46] if I double click on it to see what this
[01:15:48] 3D model is we can see that it's just a
[01:15:51] very simple crate so nothing too fancy
[01:15:54] but will get the point across on how we
[01:15:56] create 3D Assets in Unreal
[01:15:58] Engine so let's go to content drawer and
[01:16:02] under my stuff I'm going to save
[01:16:04] everything right click let's create a
[01:16:05] brand new folder call this one wooden
[01:16:08] crate let's double click to go inside of
[01:16:11] it so wooden crate will have all our
[01:16:12] assets that combined to create the
[01:16:14] wooden crate asset so first let's import
[01:16:17] the 3D model so hold on left Mouse
[01:16:19] button drag it and simply let go now we
[01:16:21] have a bunch of fbx import options
[01:16:24] generally I keep it at default if you do
[01:16:26] see something is different click on
[01:16:28] reset the default to get those default
[01:16:29] values back now generally under
[01:16:32] materials for create new materials I do
[01:16:34] not create a material since we are not
[01:16:36] going to be starting from scratch we're
[01:16:37] going to be using the master material on
[01:16:39] this and for import textures uncheck
[01:16:42] that to false since we aren't going to
[01:16:43] be importing any textures since I rather
[01:16:45] import those textures manually and click
[01:16:47] on import so we might get this warning
[01:16:50] that's fine you can ignore that and now
[01:16:52] if I double click on the wood crate we
[01:16:55] can see that our wooden crate has been
[01:16:57] successfully imported into Unreal Engine
[01:16:59] five I can drag this out into my scene
[01:17:03] scale it rotate it move it around pretty
[01:17:07] much it has all the same functionalities
[01:17:10] as any of the objects that Unreal Engine
[01:17:12] comes with so that's how you import a 3D
[01:17:14] object let's go over how we can create a
[01:17:16] material for this 3D object now luckily
[01:17:20] for us we've already done most of the
[01:17:21] work and that is our Master material so
[01:17:23] mcore master material has everything
[01:17:26] that we need to create a material for
[01:17:28] this object except the textures so let's
[01:17:31] import the textures real quickly press
[01:17:34] control and space to bring up the
[01:17:35] content drawer select all of them with
[01:17:37] shift and drag them into the content
[01:17:40] drawer so let's double check that all
[01:17:42] our maps are correct starting with the
[01:17:44] base color and srgb is turned on which
[01:17:47] is exactly what we want would create
[01:17:49] uncore metallic should have srgb turned
[01:17:52] off since this is a mask
[01:17:55] and this fancy texture right here we are
[01:17:58] going to ignore but I will go over it in
[01:18:00] just a bit and right there is wood crate
[01:18:03] unor normal let's double click make sure
[01:18:06] that it was imported as a normal map
[01:18:07] srgb is turned off and compression
[01:18:09] settings is set to normal map which is
[01:18:11] exactly what we want and for roughness
[01:18:14] of course since this is a roughness mask
[01:18:16] make sure srgb is turned off so let's go
[01:18:19] save everything and create a material
[01:18:22] instance of our Master mat material so
[01:18:25] let's right click create material
[01:18:27] instance and call us one miore wooden
[01:18:31] crates so drag this into our wooden
[01:18:34] crate folder and move here so double
[01:18:37] click and we have our material instance
[01:18:40] so I'm going to apply this to our crate
[01:18:42] and obviously it's using the wrong
[01:18:44] textures so let's open up our material
[01:18:47] instance for wooden crate and activate
[01:18:50] color normal and roughness so let's drag
[01:18:53] those textures that want
[01:18:57] specifically color into base color
[01:19:00] roughness into roughness and normal into
[01:19:03] normal our material is almost complete
[01:19:05] but we are missing one last thing and
[01:19:08] that is the metallic map to make our
[01:19:09] nails metallic so to do so this is why
[01:19:12] we added the is metallic switch right
[01:19:14] here and now we get the metallic texture
[01:19:17] let's turn this on find where our
[01:19:19] metallic map is and simply drag it onto
[01:19:22] texture and let go like that and now our
[01:19:24] Nails our metallic we can see it
[01:19:27] successfully reflecting the Sun so
[01:19:29] that's pretty amazing how very quickly
[01:19:32] we were able to automate the process of
[01:19:33] creating a material by using our Master
[01:19:36] material so we could create a material
[01:19:39] without ever even touching the material
[01:19:40] graph by just creating an instance of
[01:19:42] that Master material and what's amazing
[01:19:45] is that we still have access to all the
[01:19:46] parameters right here so I can change
[01:19:48] the normal flatness to5 to increase the
[01:19:51] normals or I can go into roughness
[01:19:53] strength and decrease the roughness
[01:19:55] value to make our box even shinier I can
[01:19:58] even go into the color tint and give it
[01:20:01] a slightly orangey reddish tint now it
[01:20:04] is important that if you do drag a
[01:20:06] texture onto an object and the texture
[01:20:09] looks like this so looks completely out
[01:20:12] of sync that's because the size value
[01:20:14] most likely is not one so come into size
[01:20:17] and make sure that it's set to one as
[01:20:19] its default value so now we have a nice
[01:20:23] box asset I can hold on alt duplicate
[01:20:26] this maybe scale it up and even drag it
[01:20:30] from the content browser but now we do
[01:20:33] have an issue and that is when we drag a
[01:20:35] box from the content browser it does not
[01:20:37] have the material we just created so to
[01:20:39] set our box as default material we need
[01:20:41] to open up the asset static mesh
[01:20:44] editor and within here we see that we
[01:20:47] have a default material slot right now
[01:20:49] it's using the world grid material we're
[01:20:51] going to set this to miore wooden like
[01:20:54] that press save and now that material is
[01:20:57] applied to all our boxes even when we
[01:20:59] drag out a brand new box before we move
[01:21:02] on to the next chapter I think it's
[01:21:04] important to point out what this texture
[01:21:07] right here does so I'm going to double
[01:21:08] click on it and this texture does look a
[01:21:11] little bit weird but essentially what it
[01:21:13] is is that it combines several different
[01:21:15] masks into one texture using the RGB
[01:21:18] channels I know that might sound
[01:21:20] confusing but essentially in computer
[01:21:22] Graphics color is made up of a red
[01:21:24] Channel a green Channel and a blue
[01:21:26] channel so what developers realize is
[01:21:29] that they can take these individual
[01:21:31] channels and then hide masks inside of
[01:21:33] them so for example if we uncheck the
[01:21:36] blue Channel and the green Channel we
[01:21:38] see that the red channel of this texture
[01:21:39] is our metallic mask uncheck red check
[01:21:43] green our green channel is roughness
[01:21:44] uncheck green and check blue our blue
[01:21:47] channel is ambient occlusion although we
[01:21:49] won't use Ambi inclusion I included it
[01:21:51] within a texture to show that we can
[01:21:52] hide three different mass in inside a
[01:21:54] single texture and because even though
[01:21:57] this is a color texture it's actually
[01:21:59] going to be used as mass we want to
[01:22:01] uncheck srgb right there so the way we
[01:22:04] would use this in a material is let's
[01:22:06] create a brand new material call this
[01:22:08] one mask
[01:22:09] example and double click to go inside of
[01:22:11] it so if we were to create a material
[01:22:14] from this mask I'm going to drag out our
[01:22:16] base color in our normal map because of
[01:22:19] course we still need them and instead of
[01:22:22] using our metallic or our roughness
[01:22:26] texture we combine those into one
[01:22:29] individual texture right here so we
[01:22:30] don't need those since they're combined
[01:22:32] into this one and our red channel is
[01:22:35] metallic so I'm going to grab from the r
[01:22:38] pin into metallic and our green channel
[01:22:40] is roughness now roughness didn't have
[01:22:42] to be the green Channel it could have
[01:22:44] been blue or red just I decide to use
[01:22:46] the green Channel and if I press apply
[01:22:49] inside of our map let's apply the new
[01:22:51] material to this crate and right now
[01:22:54] there is a slight difference between the
[01:22:56] two since in the material instance I am
[01:22:59] using color tint so reset that back to
[01:23:02] White and jumping back here we can see
[01:23:05] that there's virtually no difference in
[01:23:07] between combining the textures or using
[01:23:09] the textures separately so I included it
[01:23:12] within this course because it's pretty
[01:23:13] important to know why unreal developers
[01:23:15] use this since you will be seeing this a
[01:23:17] lot also it's good to know exactly what
[01:23:20] these r g and B pins are used for that
[01:23:23] is how you create unreal assets but
[01:23:26] you're probably wondering now how do I
[01:23:27] move unreal Assets in between different
[01:23:30] unreal projects because it would be a
[01:23:32] real shame if every time we create a new
[01:23:34] project we have to remake all the assets
[01:23:38] and we can move Assets in between
[01:23:39] projects through an easy process called
[01:23:42] migration so to migrate Assets in
[01:23:44] between two unreal projects of course we
[01:23:47] need a new Unreal project included
[01:23:49] within the downloadable content Link in
[01:23:51] the description below is a project that
[01:23:53] contains some assets I want to bring
[01:23:55] into our first project that we've been
[01:23:57] working on So within the zip file go
[01:24:00] into it and it's specifically intro
[01:24:02] unreal project so just drag it onto our
[01:24:05] desktop to unzip it and double click to
[01:24:07] go inside of the project folder to open
[01:24:10] up an un real project double click on
[01:24:11] theu Project now that I have the
[01:24:13] downloaded project open up if I press
[01:24:16] control and space we can see all the
[01:24:17] content that's currently inside of it
[01:24:19] now if your content folder is empty then
[01:24:21] that means you didn't unzip the project
[01:24:23] so make sure you do unzip zip the
[01:24:24] project before opening it up so I have a
[01:24:27] folder called line in examples with some
[01:24:29] maps materials meshes and textures
[01:24:32] they're going to help us demonstrate
[01:24:33] unreal's lighting capabilities I don't
[01:24:35] want to bring all of these assets into
[01:24:37] our original project called first
[01:24:39] project so to do so I'm going to dock
[01:24:41] them to the sides of my screen and let's
[01:24:44] go open up our content drawer so what
[01:24:47] I'm going to do is copy our lighting
[01:24:49] examples folder which is right here and
[01:24:52] bring it into another project to do so
[01:24:54] we use a process called migration and
[01:24:56] migration is really simple simply hover
[01:24:59] over the assets you want to breing into
[01:25:00] another unreal project right click and
[01:25:03] select migrate now it's going to give us
[01:25:06] a list of all the assets that are going
[01:25:08] to be migrated and this all looks
[01:25:11] correct so I'm going to click on okay
[01:25:13] and now it's asking for a location to
[01:25:16] migrate them to we specifically want to
[01:25:18] migrate them into the content folder of
[01:25:20] the destination project and you can find
[01:25:23] out where the content folder is is by
[01:25:25] double clicking on the original project
[01:25:27] file so right here is first project
[01:25:30] which is where this project is stored
[01:25:32] and if I go into its project file we see
[01:25:34] that there's a Content folder and this
[01:25:36] is the location that I want to migrate
[01:25:37] all these assets to so I could go
[01:25:40] through and manually navigate to this
[01:25:43] location or I can copy its destination
[01:25:45] with contrl c and contrl V it right here
[01:25:49] so now I have the content folder of our
[01:25:51] original project selected I'm telling a
[01:25:53] real that I want to move the files from
[01:25:55] intro on real project to First project
[01:25:58] and click on select folder so now we can
[01:26:00] see content migration successful and if
[01:26:02] I go into first project now press
[01:26:04] control and space under content we now
[01:26:07] have lighting examples which are all the
[01:26:09] same assets from our downloaded project
[01:26:12] now an alternative that's how we don't
[01:26:13] have to go and find where our project
[01:26:15] file is located in order to get the
[01:26:17] content folders location I could press
[01:26:21] control and space to go into the content
[01:26:22] drawer and right click on our content
[01:26:25] folder and go show and explore this will
[01:26:28] automatically bring up the content
[01:26:30] folder from our project finally let's
[01:26:33] talk about Unreal Engine 5's brand new
[01:26:35] lighting system called Lumen and Lumen
[01:26:37] is revolutionary because it gives us
[01:26:39] real time Global illumination and
[01:26:42] essentially Global illumination is just
[01:26:44] a very fancy term for light bounce
[01:26:47] because in Real Life Light doesn't just
[01:26:49] hit an object and stop instead it hits
[01:26:51] an object bounces off that object and
[01:26:53] after each Bounce It illuminates the
[01:26:55] world it also takes a little bit of that
[01:26:57] object's color and projects it onto the
[01:27:00] next object for example it might be a
[01:27:02] little bit hard to see because the video
[01:27:03] is being streamed but here we have a red
[01:27:06] mouse and lights is hitting this mouse
[01:27:09] taking a little bit of its color and
[01:27:10] then projecting it onto any nearby
[01:27:12] objects so if I move the mouse to the
[01:27:15] table around the table there's a little
[01:27:17] bit of a reddish Tint that's coming from
[01:27:20] the bounce lighting so Global
[01:27:21] illumination is important because it's
[01:27:23] the SE
[01:27:24] to realistic rendering but there's one
[01:27:27] large problem and that is global
[01:27:28] illumination is very expensive to
[01:27:31] calculate real-time Global illumination
[01:27:33] isn't possible without a super powerful
[01:27:36] GPU and this is where Lumin comes in
[01:27:38] handy Lumen is a brand new way to render
[01:27:41] Global illumination at the fraction of a
[01:27:43] cost compared to traditional ways to get
[01:27:45] Global illumination like Hardware rate
[01:27:48] tracing so to show luminant action let's
[01:27:51] jump back into unreal and to do so we
[01:27:53] need the cont that we just migrated over
[01:27:55] so if you haven't already make sure you
[01:27:57] download the lighting examples Link in
[01:27:58] the description below and migrate it
[01:28:00] into our project from the previous
[01:28:02] chapter so to begin let's go to maps and
[01:28:05] light bounce so as we can see this is an
[01:28:08] insanely simple room all we have is four
[01:28:11] walls and two objects and a light source
[01:28:14] I've also gone ahead and added in a
[01:28:15] post-process volume since by default
[01:28:17] Lumin is turned on I want to turn off
[01:28:20] alumin to demonstrate how we used to get
[01:28:21] Global illumination back in the unrealed
[01:28:24] 4 days so as we can see global
[01:28:26] illumination method is set to none now
[01:28:28] let's just pretend that we're in unre 4
[01:28:31] and I want some Global illumination
[01:28:32] since obviously Shadows are never this
[01:28:35] dark normally you would see some light
[01:28:37] bouncing around to illuminate the shadow
[01:28:38] areas right here so the first thing I
[01:28:40] would do is number one make sure my
[01:28:42] light sources are set to static not
[01:28:44] movable and number two I need to build
[01:28:46] my level and to build you want to come
[01:28:49] up to the build tab all the way up here
[01:28:51] select it and within the drop down
[01:28:53] simply select build all levels right now
[01:28:55] behind the scenes unreal is Ray tracing
[01:28:57] our entire level and creating a light
[01:29:00] map this light map contains all the
[01:29:01] lighting data which it then overlays
[01:29:03] onto our world as a texture now we are
[01:29:05] done building our lighting it should
[01:29:07] have been pretty quick because this is a
[01:29:08] very small level and if we look at our
[01:29:11] level we can see that we do have Global
[01:29:13] illumination notice how this sphere is
[01:29:15] no longer Pitch Black in the shadow
[01:29:17] areas there's now light filling up the
[01:29:19] Shadows making it look a lot more
[01:29:21] realistic than beforehand we can even
[01:29:23] see that there's some red on the sphere
[01:29:25] that's bouncing from the red wall same
[01:29:27] thing over here the entire room has a
[01:29:30] little bit of a greenish tint since this
[01:29:32] green wall is also bouncing light off so
[01:29:34] this is how we used to get Global
[01:29:36] illumination on ReliOn 4 and while this
[01:29:38] is great there are some major issues
[01:29:41] mostly that our lighting and all our
[01:29:42] shadows are static so if I select my
[01:29:45] sphere and move it around we can see
[01:29:47] that the lighting breaks press contrl Z
[01:29:49] to undo that then even if I select my
[01:29:51] light source and move it around the
[01:29:53] lighting also breaks braks notice how if
[01:29:55] I move my light away we now have two
[01:29:58] Shadows so there's one Shadow that's
[01:30:01] coming from the light source and another
[01:30:03] Shadow that's coming from our light map
[01:30:04] which is no good so I'm press contrl and
[01:30:07] Z to put our lighting back in the
[01:30:09] original spot and this is where Lumin
[01:30:11] comes in really handy because it allows
[01:30:13] us to have Dynamic Global illumination
[01:30:15] so I can move my light around and move
[01:30:17] my sphere with no issues whatsoever but
[01:30:20] first we have to get rid of our light
[01:30:21] map since we did bake our world to do so
[01:30:24] so you need the world settings tab Now
[01:30:26] by default there is no world settings
[01:30:28] tab we can get that by coming up to
[01:30:30] Windows and selecting World settings all
[01:30:33] the way down here and now we have our
[01:30:35] world settings as you can guess World
[01:30:37] settings is simply the settings of our
[01:30:38] world so this is where we would control
[01:30:40] our light baking and we will go over
[01:30:42] light baking settings in just a bit but
[01:30:44] for now I want to get rid of our light
[01:30:46] maps by selecting Force no precomputed
[01:30:48] lighting which will tell unreal that I
[01:30:50] don't want to use any light maps and I
[01:30:52] don't want to build our lighting and
[01:30:54] then after I said that to True make sure
[01:30:56] you press build now that didn't build
[01:30:58] our lighting instead it went through and
[01:31:00] it got rid of all of our light map
[01:31:01] textures so let's come back to details
[01:31:04] and now I'm going to set my light source
[01:31:06] to movable so now that it's set to
[01:31:08] movable we still aren't getting any
[01:31:10] Global illumination because if you
[01:31:11] remember in the post-process volume I
[01:31:14] turned off Lumin so let me zoom in a
[01:31:16] little bit so we can see this better
[01:31:18] here is unru 5 without Lumen and here is
[01:31:21] UNR 5 with lumen so this is without and
[01:31:26] this is with and what's amazing is that
[01:31:28] I can move this light around and there
[01:31:30] are no issues I can even move this
[01:31:33] sphere and make it bigger smaller and
[01:31:37] unreal is calculating all this Global
[01:31:39] illumination at a very smooth frame rate
[01:31:42] which is absolutely amazing this was not
[01:31:44] possible in Unreal Engine 4 so if I grab
[01:31:47] this light and even if I move it all the
[01:31:49] way over here we can see that there's
[01:31:51] bounce lighting coming from the light
[01:31:52] hitting the wall and then bouncing and
[01:31:55] hitting the sphere giving our entire
[01:31:57] sphere a little bit of a reddish tint on
[01:32:00] the right side which is very realistic
[01:32:03] we can even come into the point light
[01:32:04] settings and gives ourselves a softer
[01:32:06] Shadow by increasing the source radius
[01:32:09] so if I increase this notice that the
[01:32:11] Shadows get softer and
[01:32:13] softer Global illumination used to be
[01:32:16] pretty expensive since you'd have to use
[01:32:17] Hardware raid tracing but now thanks to
[01:32:20] Lumin it's accessible to everyone while
[01:32:23] running out smooth frame rate depending
[01:32:25] on your computer and something that was
[01:32:27] not possible in u4 even with Hardware
[01:32:30] rate tracing is that if I come into
[01:32:31] lighting examples materials and use
[01:32:34] mcore emissive material or emissive
[01:32:37] materials give off light so I'm able to
[01:32:41] light up a scene by just using our
[01:32:43] materials which is really amazing so I'm
[01:32:45] going to press contrl and Z to undo
[01:32:47] those since now it's time to go over all
[01:32:49] the different light sources that unreal
[01:32:51] has to offer so to begin let's talk
[01:32:53] about the point Point light so I'm going
[01:32:55] to delete it and to get a point light
[01:32:56] you want to come up to the add button of
[01:32:58] course and under lights drag in a point
[01:33:02] light so the point light is the most
[01:33:04] basic of Lights it's just a point that
[01:33:06] emits light in all directions so let's
[01:33:09] go over the most important settings in
[01:33:11] the details panel and probably the most
[01:33:13] important one right now is intensity so
[01:33:16] it's at eight Candelas I can bring this
[01:33:18] down to one two or even something
[01:33:21] insanely large like 100 to change the
[01:33:23] power of the light source but for now
[01:33:26] I'm going to leave this at four we also
[01:33:28] have the source radius which I just went
[01:33:30] over but if we increase it and make sure
[01:33:33] that you do have game view turned off up
[01:33:36] here you can see that there is a and
[01:33:39] hopefully you can see this a little bit
[01:33:42] better with the red background we have
[01:33:44] the outline of a yellow sphere and this
[01:33:47] sphere basically tells us the size of
[01:33:49] our light emission and the larger our
[01:33:52] yellow sphere is then the more soft our
[01:33:55] shadows will be and as I decrease this
[01:33:58] all the way back down to this default of
[01:33:59] zero we get some really harsh Shadows so
[01:34:03] if you want to soften that up breed up
[01:34:04] the source radius now right below that
[01:34:07] we have temperature so temperature
[01:34:09] allows us to change how warm or cold our
[01:34:11] light source is if I bring this down our
[01:34:14] light source gets warmer and warmer and
[01:34:16] if I bring this up it gets colder and
[01:34:18] colder and I can disable temperature by
[01:34:21] clicking on the temperature button and
[01:34:23] all the way to down here we have light
[01:34:25] color so as you can guess light color
[01:34:28] just changes the color of our light the
[01:34:31] controls are exactly the same as our
[01:34:33] materials and above all these is the
[01:34:35] indirect lighting intensity so right now
[01:34:38] it's set at one when I set to zero we're
[01:34:41] going to have very little bounce light
[01:34:44] and our shadows end up like beforehand
[01:34:46] where they're pretty dark not much
[01:34:48] bounce lighting is happening or instead
[01:34:51] of one which is its default I can read
[01:34:53] to 10 and now we have a lot of Bounce
[01:34:56] lighting so I'm just going to leave it
[01:34:58] at one for now so those were all the
[01:35:01] main settings for Point lights I'm going
[01:35:03] to delete that and let's go over the
[01:35:05] next light right now and that is the
[01:35:08] spotlight the spotlight is very similar
[01:35:10] to the point light although unlike the
[01:35:12] point light the spotlight is just
[01:35:14] Illuminating One
[01:35:16] Direction and you could change the
[01:35:18] direction the light is pointing by of
[01:35:20] course rotating it the settings are the
[01:35:24] exact same as the point light except we
[01:35:26] have an inner and outer cone angle so
[01:35:28] the outer cone angle will control the
[01:35:29] size of our Spotlight and the inner cone
[01:35:32] angle will control the fall off of our
[01:35:33] light so I'm going to go to game View
[01:35:35] mode so we can better see this and as I
[01:35:37] increase the inner cone angle we can see
[01:35:39] that our lighting gets sharper and
[01:35:41] sharper and sharper and if I decrease it
[01:35:43] all the way to zero there's a very soft
[01:35:45] fallof so those are the controls for the
[01:35:48] spotlight I'm going to delete that and
[01:35:49] go into the next one and that is the
[01:35:52] rectangle light so rectangle light is
[01:35:54] pretty similar to the spotlights and
[01:35:56] directional light except now we're
[01:35:58] emitting from a rectangle pointing in a
[01:36:00] specific Direction hopefully you can see
[01:36:03] the outline of the lights when it's
[01:36:04] against the wall and I control the size
[01:36:07] of the
[01:36:09] rectangle by going into Source width and
[01:36:12] increasing the width or I can increase
[01:36:15] the height I can even just like
[01:36:17] beforehand play with the falloff by
[01:36:20] decreasing the Barn Door angle from 88
[01:36:22] all the way to Z Z and hopefully you can
[01:36:25] better see it from this angle what the
[01:36:28] barn door is or I can increase the
[01:36:31] length so we have a lot of control over
[01:36:34] the specific falloff of that rectangle
[01:36:36] light other than that the controls are
[01:36:38] the same so let's delete that and next
[01:36:41] up is probably the light you're going to
[01:36:44] be using the most the directional light
[01:36:47] so we don't see anything with the
[01:36:48] directional light right now because I
[01:36:50] have to rotate it to see what it does
[01:36:53] and as you can guess this is the
[01:36:54] sunlight so the sunlight is pointing in
[01:36:57] a specific Direction infinitely and just
[01:37:00] like the spotlight if I rotate this
[01:37:02] around I'm able to control the direction
[01:37:04] of our sun the directional light has
[01:37:07] pretty much the same exact controls as
[01:37:09] our Point lights except if I zoom in on
[01:37:12] the Shadows we get Source angle bring up
[01:37:14] the source angle makes the shadow
[01:37:15] smoother and bring down the source angle
[01:37:18] makes the Shadows sharper so I'm going
[01:37:20] to reset value by clicking on the Arrow
[01:37:22] icon
[01:37:24] and I'm going to delete our directional
[01:37:26] light since there's one last Light I
[01:37:27] want to show and that is the Skylight so
[01:37:31] let's drag in the Skylight and you'll
[01:37:33] notice nothing is happening and the
[01:37:36] reason why is because the Skylight is
[01:37:37] pretty unique essentially what it does
[01:37:40] is that it captures our sky and then it
[01:37:41] projects it onto our world and right now
[01:37:44] our Skylight isn't doing anything
[01:37:46] because obviously our world doesn't have
[01:37:48] any sky so the way we can add sky is
[01:37:51] pretty simple number five you just want
[01:37:53] to come up to the add button come all
[01:37:55] the way down to visual effects and drag
[01:37:57] in a sky and atmosphere simply place it
[01:38:01] right there and again if I look up we
[01:38:04] don't have any Sky since the sky
[01:38:06] requires a directional light which is
[01:38:08] the sunlight so let's also come up to
[01:38:11] add down a lights and drag in a
[01:38:13] directional light for our Sky now if our
[01:38:16] Sky light isn't working then it has to
[01:38:18] be refreshed by going into the details
[01:38:20] panel and turning on and off effects
[01:38:22] world now the reason why I know the
[01:38:25] lighting in our room right now is from
[01:38:26] the sky and not from the directional
[01:38:29] light is because the directional light
[01:38:31] is not hitting the inside of our room so
[01:38:33] if I move it around then we can see that
[01:38:36] our directional light is Illuminating
[01:38:38] our room but if I move it that's how
[01:38:40] it's coming from the back the lighting
[01:38:42] is entirely coming from the Skylight and
[01:38:44] we can see this better by hiding and
[01:38:46] unhiding the Skylight by using the
[01:38:48] effects world right there so here the
[01:38:50] Skylight is being used and here the
[01:38:52] Skylight is isn't so this is without
[01:38:54] Skylight and this is with skylight and
[01:38:58] something that's pretty cool about the
[01:39:00] Skylight is that if I add in a cube so
[01:39:03] let's come up to shapes Cube drag that
[01:39:05] in scale that up we can make a makeshift
[01:39:11] door and now notice how as I move my
[01:39:15] Cube the Skylight slowly starts to
[01:39:18] illuminate our room so that's why the
[01:39:21] Skylight is a pretty big deal since it
[01:39:24] allows us to capture our sky and project
[01:39:27] it onto a world as Lumin lighting and
[01:39:30] finally it's time to go over Lumen
[01:39:31] settings so these are settings that
[01:39:33] affect all of our Lumin lighting before
[01:39:35] we move on to lighting and environment
[01:39:37] completely from scratch so I'm going to
[01:39:39] delete
[01:39:40] everything and I'm just going to add in
[01:39:43] a simple Point light once again because
[01:39:46] I want to show and also decrease the
[01:39:48] intensity to four and this is probably
[01:39:51] something you've noticed is that there
[01:39:53] is a lot of noise especially in the
[01:39:55] shadows now I don't know if it shows up
[01:39:58] due to the YouTube compression but if
[01:40:01] you are following along with the
[01:40:02] tutorial you can see a lot of that noise
[01:40:05] and to get rid of that noise we need to
[01:40:06] play with the Lumen settings which are
[01:40:08] located in our postprocess volume so
[01:40:10] find out where your post-process volume
[01:40:12] is as a reminder you can create a
[01:40:14] postprocess volume by coming up to add
[01:40:17] volumes and postprocess volume and make
[01:40:20] sure in your postprocess volume
[01:40:23] that infinite extent Unbound is turned
[01:40:26] on because otherwise our post-process
[01:40:27] volume will not be affecting our entire
[01:40:29] world so you want to come down all the
[01:40:32] way inside the postprocess volume to
[01:40:34] Global illumination and by default Lumin
[01:40:36] is turned on and we get a bunch of lumen
[01:40:39] settings under luming Global
[01:40:40] illumination so first off to get rid of
[01:40:43] that noise check Final gather quality
[01:40:46] and increase it from 1 to 4 now we can
[01:40:50] see that noise slowly start to disappear
[01:40:53] and there is a lot less noise we can
[01:40:54] even increase this to 10 and now our
[01:40:57] scene definitely looks a lot better so
[01:41:00] if we hover over any of these settings
[01:41:01] it gives us a very quick description
[01:41:04] while final gather quality does get
[01:41:05] rived the noise it also comes at the
[01:41:07] cost of GPU so just keep that in mind
[01:41:10] that if you do increase final gather
[01:41:12] quality you might lose on some
[01:41:14] performance there are also some other
[01:41:16] settings which I'm going to go over in
[01:41:17] the next chapter that's the basics of
[01:41:19] lighting in u5 now we're going to take
[01:41:22] the knowledge that we just learned and
[01:41:24] apply to lighting an architectural
[01:41:25] visualization scene first we're going to
[01:41:27] light the environment by using Lumin and
[01:41:30] movable lights then we're going to light
[01:41:32] the same exact environment but with
[01:41:34] static and baked lighting so we're going
[01:41:37] to compare the two methods of getting
[01:41:38] Global illuminations and see their pros
[01:41:41] and cons the specific architectural
[01:41:43] environment is already included within
[01:41:45] our lighting examples that we migrated
[01:41:47] into our first project we can see under
[01:41:49] lighting examples Maps it's the map
[01:41:52] that's right next to the map that we've
[01:41:53] been editing which is light bounce so
[01:41:55] let's double click on Arc VI room and we
[01:41:58] won't see anything because there are no
[01:41:59] lights if I press alt and three or if I
[01:42:02] click on unlit from The View mode that
[01:42:05] this environment is just a simple room
[01:42:07] with some furniture and a window from
[01:42:10] which all our light is going to come
[01:42:11] from so very simple room which will help
[01:42:13] us learn and get the gist of how to
[01:42:15] light is seen in Unreal Engine I'm going
[01:42:18] to press alt and four as a shortcut to
[01:42:19] go back into our default view mode now
[01:42:22] the first light I'm going to add in is
[01:42:23] the main light which is the Sun so let's
[01:42:27] add in a directional light and I'm going
[01:42:29] to rotate it so that the sun is coming
[01:42:32] through the window and already
[01:42:35] especially right here we can see global
[01:42:37] illumination and Lumin at work so I want
[01:42:40] to find a nice
[01:42:41] angle I think right there is pretty good
[01:42:44] but if we look outside there is no Sky
[01:42:47] it kind of looks scary just seeing an
[01:42:48] endless black void so let's add in a sky
[01:42:52] by coming back up here here to visual
[01:42:53] effects and the sky and atmosphere so
[01:42:56] drag that in but half of our world the
[01:42:59] bottom half is still a black void we can
[01:43:02] hide that black void with fog so come
[01:43:04] back up to add visual effects and below
[01:43:07] sky and atmosphere we have exponential
[01:43:09] hey fog simply drag that in and now if
[01:43:12] we look outside the window all we see is
[01:43:14] Sky which is what I want but there is a
[01:43:17] little bit of an issue and that is if we
[01:43:20] hide and unhide the exponential height
[01:43:21] fog we can see that there is a little
[01:43:24] bit of fog inside of our room and we
[01:43:26] don't want that so within the
[01:43:28] exponential height fog one of the
[01:43:30] settings we're going to change is right
[01:43:32] here start distance I'm going to drag
[01:43:34] this all the way up to its Max of 5,000
[01:43:37] so essentially start distance is saying
[01:43:39] do not use fog until we're 5,000 CM away
[01:43:43] from our camera so now if I hide and
[01:43:44] unhide it we don't have any fog inside
[01:43:46] our room there is one more light that I
[01:43:49] want to add to our room and that is the
[01:43:52] skylight so let's come with lights
[01:43:54] Skylight and drag it in so we can
[01:43:56] already see that our room got a little
[01:43:58] bit of a bluish tint from our Sky I can
[01:44:00] hide and unhide it right here so effects
[01:44:02] world turn it off and turn it back on so
[01:44:06] we can see that it does make a little
[01:44:07] bit of a difference so I'm going to set
[01:44:09] the Skylight to movable and also set the
[01:44:12] sun to movable since both of these
[01:44:14] lights are being used with Lumen we
[01:44:16] aren't baking any lights and another
[01:44:19] thing I'm going to do is add in a
[01:44:20] post-process volume since if we come
[01:44:22] over here and I don't know if it's
[01:44:24] noticeable in the YouTube video but
[01:44:25] there is a little bit of noise so we can
[01:44:28] get rid of that by adding in the
[01:44:30] postprocess volume simply drag it in and
[01:44:33] make sure you scroll down and infinite
[01:44:36] extent Unbound is turned on so we don't
[01:44:38] have to be in the post process volume
[01:44:40] for it to take effect now let's Zoom all
[01:44:43] the way up to looming Global
[01:44:46] illumination and right here for final
[01:44:48] gather quality instead of one I'm going
[01:44:50] to set that to 10 and allow that that
[01:44:53] noise just disappeared also I want to
[01:44:55] add some soft Shadows to the really
[01:44:58] small objects since right now there is
[01:45:00] no soft Shadow that's being given off
[01:45:02] from the phone the clock or the coffee
[01:45:05] mug so the reason why is because I have
[01:45:07] to increase the Lumin scene detail right
[01:45:11] here from 1 to 4 so this was beforehand
[01:45:14] at one and now this is four so by
[01:45:18] default to save on processing power
[01:45:21] Lumen excludes a lot of small objects
[01:45:23] from its calculations so you need to
[01:45:25] tell in real that you want them within
[01:45:27] the Lumin calculation by increasing it
[01:45:29] from 1 to 4 or even higher if you do
[01:45:32] have smaller
[01:45:33] objects and one last edit I'm going to
[01:45:36] make to postprocess volume is setting it
[01:45:39] for a manual exposure so under exposure
[01:45:42] metering mode set to manual bring up the
[01:45:45] exposure compensation
[01:45:47] [Music]
[01:45:49] to
[01:45:51] 13.25 it's pretty good and also this is
[01:45:54] an artistic choice we increase it we can
[01:45:57] see that we get more bloom in our world
[01:45:59] so maybe a value of two so this is
[01:46:03] without Bloom and with Bloom I do think
[01:46:06] it makes the scene look a little bit
[01:46:07] nicer and that is the basics of lighting
[01:46:10] an environment in Unreal Engine 5
[01:46:13] specifically for architectural
[01:46:15] visualization and since we're using
[01:46:16] Lumin that gives us the ability with
[01:46:18] control and L as a shortcut to rotate
[01:46:21] our sun watch
[01:46:23] our world be updated in real time based
[01:46:27] off of our Sun's lighting which is
[01:46:29] pretty insane now while Lumen is amazing
[01:46:32] we do get some trade-offs and quality
[01:46:35] just because we are able to use
[01:46:36] real-time Global illumination doesn't
[01:46:38] mean that it's the best case for certain
[01:46:40] scenarios specifically a scenario like
[01:46:42] this where there isn't going to be any
[01:46:44] moving Parts since it's just an
[01:46:45] architectural visualization scene we
[01:46:47] might as well bake our lighting because
[01:46:49] number one bake lighting is always more
[01:46:52] performance friendly
[01:46:53] then using Lumen because Lumen does do a
[01:46:55] lot of GPU calculations behind the
[01:46:57] scenes while big lighting is just
[01:46:59] overlaying a texture and number two if
[01:47:02] you properly bake your lights into a
[01:47:04] good light map then the quality will be
[01:47:06] better than Lumen so let's convert our
[01:47:09] Lumin environment into a baked lighting
[01:47:11] environment so I want to make a copy of
[01:47:13] our current level which're is arcv room
[01:47:15] by selecting it in our content drawer
[01:47:17] and pressing controll and D to duplicate
[01:47:19] it so let's call this one arcv room
[01:47:23] baked and double click to go inside of
[01:47:25] it make sure we save
[01:47:27] selected all right great so first thing
[01:47:29] I'm going to do is select all my lights
[01:47:32] and set my directional light to static
[01:47:35] and set my Skylight also to
[01:47:38] static now I'm going to go into my
[01:47:40] postprocess volume and disable Lumen for
[01:47:42] Reflections and Global illumination so
[01:47:45] set this to none and under Reflections
[01:47:48] also set this to none so we can see
[01:47:51] immediately we aren't getting any global
[01:47:53] illumination that's because I should
[01:47:54] come up to build and build all levels to
[01:47:57] start Ray tracing in the background all
[01:48:00] right great so here we have our baked
[01:48:03] lighting this is really bad since we
[01:48:06] need to increase the quality of our
[01:48:07] light bakes by going into the world
[01:48:10] settings and if I scroll up we can see
[01:48:13] that under light MK we have light mass
[01:48:15] settings and in the drop down we have a
[01:48:17] bunch of settings that will change the
[01:48:19] quality of our light baking so first
[01:48:21] thing I want to increase the number of
[01:48:24] bounces which will just illuminate our
[01:48:26] scene a little bit more so the number of
[01:48:28] indirect lighting bounces is right now
[01:48:29] set to three let's set that to 10 and
[01:48:32] also for skylighting bounces set this
[01:48:34] from 1 to 10 number two for static
[01:48:37] lighting level scale if we bring this
[01:48:40] below one for example 0.5 then we're
[01:48:43] going to get a lot more quality out of
[01:48:44] our baks so I'm going to set this
[01:48:46] instead of 0.5 let's set this to
[01:48:49] 0.1 and to compensate for the static
[01:48:52] lighting level scale you want to
[01:48:53] increase the indirect lighting quality
[01:48:56] to 10 so specifically I want to increase
[01:48:59] the indirect lighting quality to 10
[01:49:01] because the static lighting level scale
[01:49:03] right now is set to 0.1 and generally
[01:49:05] you want your static lighting level
[01:49:07] scale times your indirect lighting
[01:49:09] quality to equal one so for example if
[01:49:13] instead of static lighting level scale
[01:49:14] being 0.1 I change it to 0.5 then the
[01:49:18] indirect lighting quality should be set
[01:49:20] to two since 0.5 * 2 equal 1 but I'm
[01:49:24] going to leave it at 0.1 since that does
[01:49:26] give us a better value at the cost of
[01:49:29] waiting a little bit more for the rate
[01:49:30] Trace calculations to
[01:49:32] happen and now that I like my settings
[01:49:36] come to build and click on build all
[01:49:38] levels so this build will take longer
[01:49:41] than beforehand because we increase the
[01:49:43] quality of our light bakes so now this
[01:49:45] is our scene and we didn't really notice
[01:49:48] that much of a difference since I also
[01:49:50] want to come up to build and under
[01:49:52] lighting quality make sure that it's not
[01:49:54] set to preview instead it's set to
[01:49:56] either medium higher production I'm just
[01:49:58] going to set to medium and also while
[01:50:01] I'm at it I'm going to select my
[01:50:02] postprocess volume and let's bring down
[01:50:06] the bloom since I think the bloom is to
[01:50:08] intense to one and for exposure
[01:50:13] compensation I'm going to leave it at
[01:50:15] let's go
[01:50:17] 12.7 and now if I press build build all
[01:50:19] levels keep in mind that if you are
[01:50:22] following exactly with this tutorial you
[01:50:24] do not have to press build whenever I
[01:50:26] press build since I'm building my lights
[01:50:28] a lot more frequently than I would to
[01:50:30] just demonstrate what some of these
[01:50:32] settings do so if you want to save time
[01:50:33] and not have to wait for each build then
[01:50:35] I would wait for the very end and copy
[01:50:37] those settings we can see that the
[01:50:39] quality is still not the best because if
[01:50:42] you remember light maps are being baked
[01:50:44] into a texture and if that texture has a
[01:50:46] low resolution then we're going to get
[01:50:48] low resolution shadows and lighting so
[01:50:51] we need to raise resolution on each of
[01:50:53] our static meshes and to see the
[01:50:55] resolution of our static mesh visually
[01:50:57] you can come up to LIT down to
[01:51:00] optimization view modes and select light
[01:51:02] map density with the shortcuts alt and
[01:51:05] zero so right now our entire room is
[01:51:09] pretty much blue this is not what we
[01:51:10] want we want our scene to be in the
[01:51:13] greenish to reddish range so to increase
[01:51:16] the light map resolution of a static
[01:51:18] mesh you want to select the object and
[01:51:21] within the details panels roll down
[01:51:23] until you see lighting and overridden
[01:51:26] light map resolution is at 64 turn that
[01:51:29] on and increase that to let's try 128 or
[01:51:34] 256 and okay that looks a little bit
[01:51:36] better but since this is the floor and
[01:51:38] it will have some of the Shadow I want
[01:51:40] to increase that to
[01:51:42] 512 so make the floor pretty dense I
[01:51:46] think the walls around it should also be
[01:51:49] let's go 512 and the roof and also be
[01:51:53] 512 so for the baseboard I'm going to
[01:51:55] select that and make
[01:51:59] this let's try
[01:52:01] 256 the door needs to increase it from
[01:52:04] 64 to 128 the chair is a pretty big deal
[01:52:08] since it's our focal element so let's go
[01:52:11] 256 right there and for the wall is that
[01:52:15] 256 I'm going to try 512 the table is at
[01:52:19] 128 actually let's make this 512 the
[01:52:22] wall right
[01:52:23] here 512 and the floor actually I'm
[01:52:27] going to increase this to
[01:52:29] 124 so I think this looks good now if we
[01:52:33] bake our lights let's see what this
[01:52:35] gives us so at this point it is going to
[01:52:37] take a little while for it lights to
[01:52:39] bake since there's a lot more detail it
[01:52:42] needs to
[01:52:43] calculate and probably by now you
[01:52:45] understand why Loom it is a pretty big
[01:52:47] deal since it gets rid of this
[01:52:49] repetitive process of having to wait for
[01:52:51] a lighting to bake and then if we don't
[01:52:53] like the bake we have to change
[01:52:54] something and change some settings and
[01:52:55] then bake our lighting again and then if
[01:52:57] we don't like that we have to go back
[01:52:59] and it's an entire process while Lumen
[01:53:01] just works immediately but in this case
[01:53:03] it is worth it since the quality is
[01:53:05] going to be better than Lumen okay now
[01:53:08] that we're done baking let's see what
[01:53:09] our world looks
[01:53:11] like and okay that's a lot better but
[01:53:15] the Shadows especially in between
[01:53:17] objects are a little bit too intense
[01:53:19] since by default unreal is calculating
[01:53:22] ambient inclusion I want to disable
[01:53:24] ambient
[01:53:24] inclusion since I'm just relying on our
[01:53:27] baked light map to simulate all of our
[01:53:29] shadows and lighting So within our
[01:53:31] postprocess volume let's go find where
[01:53:33] ambient occlusion is which is right here
[01:53:35] under rendering features under ambient
[01:53:37] occlusion intensity let's turn that to
[01:53:41] zero to turn it all
[01:53:43] off
[01:53:44] and
[01:53:46] increase our exposure compensation to 13
[01:53:51] okay now our scene is baked but we we
[01:53:52] are missing one last thing and that is
[01:53:55] we don't have any Reflections whatsoever
[01:53:58] our world looks pretty bad since we
[01:54:01] don't have those Reflections and the
[01:54:02] reason why is because alumin calculates
[01:54:04] Reflections automatically when we bake
[01:54:06] our lighting we have to specify where we
[01:54:08] want our Reflections to be and we do
[01:54:10] that through a sphere reflection capture
[01:54:13] so to add a sphere reflection capture
[01:54:14] come up to the add button down to visual
[01:54:17] effects and drag in a sphere reflection
[01:54:19] capture essentially what the sphere
[01:54:21] reflection capture does
[01:54:22] is that it takes a 360° Snapshot from
[01:54:26] the sphere of our world and then it uses
[01:54:28] that as the projection of our
[01:54:30] Reflections and to get a better snapshot
[01:54:33] of our world come up to build and select
[01:54:35] build reflection captures so right now
[01:54:38] we have one reflection capture but we
[01:54:40] can have multiple reflection captures
[01:54:42] since obviously it doesn't make sense
[01:54:43] for all Reflections to grab from the
[01:54:45] same location so if I duplicate this
[01:54:48] with alt and then if I decrease the
[01:54:50] influence radius within the details p
[01:54:52] panel to let's go
[01:54:53] 500 and place it on top of my small
[01:54:57] objects right
[01:54:59] here and once again come up to build and
[01:55:03] build reflection captures we can see
[01:55:06] that these objects instead of grabing
[01:55:08] from this sphere reflection capture
[01:55:10] they're grabbing from the smaller one
[01:55:11] which is overriding the larger one since
[01:55:14] the reflection capture on the table is
[01:55:16] smaller un real knows to pick this
[01:55:18] sphere reflection capture for all the
[01:55:20] objects within its radius of 5 500 cm so
[01:55:24] this is essentially how you bake
[01:55:26] Lighting in Unreal Engine now I know
[01:55:28] that the setup took a lot longer than
[01:55:30] using Lumen also we have to wait a while
[01:55:33] for each light baking to happen and for
[01:55:35] all the light maps to be created and the
[01:55:36] raay tracing to happen but in the end in
[01:55:40] my opinion the quality especially right
[01:55:43] here if I select the chair and hide
[01:55:46] it we can see how detailed those soft
[01:55:48] Shadows are and if I unhide it take a
[01:55:52] good look at this baked lighting scene
[01:55:54] jump back into our arcv Vis room which
[01:55:57] is using
[01:55:58] Lumen obviously the baked lighting looks
[01:56:01] a lot better so hopefully you understand
[01:56:02] the difference between baked lighting
[01:56:04] and Lumen their pros and cons and why
[01:56:06] you would use baked lighting over Lumin
[01:56:08] even though Lumen is real time that is
[01:56:11] the very basics of lighting an Unreal
[01:56:13] Engine of course you can get even more
[01:56:15] complicated because a lighting is an
[01:56:16] entire art form by itself but hopefully
[01:56:19] you do have a good foundation to learn
[01:56:21] more now we're we're going to go over
[01:56:23] Landscapes so landscapes in unreal are
[01:56:25] pretty important because odds are you
[01:56:26] will always be seeing a landscape or
[01:56:28] your character is on top of a landscape
[01:56:30] so in this section we're going to go
[01:56:32] over how we can create a landscape
[01:56:33] sculpt it and finally at the end go over
[01:56:36] how to add foliage to demonstrate how to
[01:56:38] make Landscapes let's create an entirely
[01:56:41] new map so press control space and let's
[01:56:43] go into my stuff and right here let's
[01:56:46] create a brand new folder called Maps
[01:56:48] which will hold all of our Maps so I'm
[01:56:50] going to select both my map and my build
[01:56:53] data and drag it into Maps let go and
[01:56:56] move here so let's jump into there and
[01:56:58] right click create a brand new level so
[01:57:00] by right clicking and creating a level
[01:57:03] instead of coming up to file and new we
[01:57:05] don't get access to the templates which
[01:57:08] is fine I do want to create a brand new
[01:57:10] level completely from scratch so let's
[01:57:12] call this one landscape example and jump
[01:57:14] in so let's save everything the reason
[01:57:17] why we're starting from a blink level is
[01:57:19] because I want to show how to light an
[01:57:21] outdoor en from scratch okay to begin
[01:57:24] let's create a landscape create a
[01:57:26] landscape you need to go into landscape
[01:57:27] editing mode to do so come up to select
[01:57:30] mode and then select landscape finally
[01:57:32] we're going to go over what some of
[01:57:33] these modes do so you can press
[01:57:36] landscape or the shortcut is shift and
[01:57:38] two so throughout this tutorial so far
[01:57:41] we've been in select with a shortcut
[01:57:43] shift and one now we're going to go into
[01:57:45] shift and two to edit our landscape we
[01:57:47] don't have a landscape so unreal is
[01:57:49] going to ask us if we want to create a
[01:57:50] landscape we see that we get a bunch of
[01:57:53] different settings that we can pick from
[01:57:55] generally I don't play with these
[01:57:56] settings I just leave it as default but
[01:57:58] if you are going to play with those
[01:57:59] settings I recommend you use the
[01:58:01] templates provided to you from the
[01:58:03] unreal documentation type in unreal docs
[01:58:07] and then type in landscape technical
[01:58:08] guide so if you are going to change any
[01:58:10] of these settings I recommend you use
[01:58:11] the presets for now I'm going to use the
[01:58:14] default settings and press create okay
[01:58:16] great now we have a landscape but before
[01:58:18] we start editing our landscape it's best
[01:58:20] to lighter scene so we know exactly what
[01:58:22] is happening first off let's add in a
[01:58:24] directional light so add light
[01:58:27] directional light simply drag that in we
[01:58:29] can leave all the sayings at default
[01:58:32] except I'm going to set to movable since
[01:58:34] I want to use completely Dynamic
[01:58:36] lighting to help us know the direction
[01:58:38] of the light and how the shadows will
[01:58:39] look like I'm going to add in a cube
[01:58:43] temporarily to help us when we're
[01:58:45] lighting our scene just like that now
[01:58:48] obviously we don't want an endless black
[01:58:49] void we want a sky so come up to R
[01:58:53] visual effects and select the sky and
[01:58:55] atmosphere to drag it in and
[01:58:56] automatically it's working if I hold on
[01:58:58] control and L as a shortcut to rotate my
[01:59:01] sun notice that the sky updates in real
[01:59:03] time so as I lower my
[01:59:06] sun the sky changes colors to represent
[01:59:09] a morning time or a dust time and I can
[01:59:12] raise it up to get a more bluish Sky
[01:59:15] which is pretty amazing that unreal
[01:59:16] automatically updates your Sky depending
[01:59:18] on your Sun's Angle now there are two
[01:59:20] issues we still have a black void in the
[01:59:23] lower half of our world and zooming in
[01:59:26] on the shadow it's pretty dark we're
[01:59:29] getting a little bit of global
[01:59:30] illumination and bounce lighting from
[01:59:32] our sun but we need lighting from our
[01:59:34] sky as a whole so to fix that come up to
[01:59:37] add lights and drag in a skylight now
[01:59:41] it's recommended for skylights that
[01:59:43] under realtime capture make sure it's
[01:59:44] turned on if you are going to use a
[01:59:46] skylight with the sky and atmosphere and
[01:59:49] also while we're at it set it to movable
[01:59:51] since we're only us using Lumen lighting
[01:59:53] Also let's go fix our black void by
[01:59:56] adding in some fog to cover that so come
[01:59:59] a visual fix and exponential height fog
[02:00:02] simply drag it out like this and we can
[02:00:04] control where the exponential height fog
[02:00:07] starts by moving the widget so if I move
[02:00:10] it up we get more fog and if I move it
[02:00:11] down we get less fog so hopefully you
[02:00:13] can see what's happening for now I'm
[02:00:15] going to leave it in the middle right
[02:00:18] here and with that a directional light
[02:00:22] sky and atmosphere Skylight and fog is
[02:00:27] pretty much how you light 90% of open
[02:00:29] World scenes in Unreal Engine 5 it is
[02:00:32] literally that easy and what's amazing
[02:00:34] is that all these objects interact with
[02:00:36] each other successfully so I can move my
[02:00:38] sun around lower it create a really dark
[02:00:43] area lower it to the point where it's
[02:00:45] night and then raise it slowly the Sun
[02:00:49] comes above the fog and starts to
[02:00:51] illuminate our world so it's completely
[02:00:54] real time time of day lighting now that
[02:00:57] we set the lighting we're able to see
[02:00:59] any edits we make to our landscape so
[02:01:01] let's finally go over the landscape
[02:01:03] editing mode and to do so I need to come
[02:01:05] up to my mode selector and select
[02:01:07] landscape from select or I can press
[02:01:10] shift and two as the shortcut so by
[02:01:13] default it's going to give us this brush
[02:01:15] right here and as you could probably
[02:01:16] guess hold down the left Mouse button
[02:01:18] I'm able to sculpt and raise the terrain
[02:01:22] so left Mouse button is to raise a train
[02:01:24] if I hold down shift and left Mouse
[02:01:26] button then I lower the train and by
[02:01:28] default we are using the basic sculp
[02:01:30] brush I can even increase the tool
[02:01:32] strength so right now it's at 0.3 of
[02:01:35] course if I bring it up to one then our
[02:01:37] sculps will be a lot more tense even
[02:01:40] holding down shift I can really lower
[02:01:43] the landscape's terrain if I want to I
[02:01:45] can control the fall off of this brush
[02:01:48] with the brush fall off so bring it to
[02:01:50] zero will mean there is no falloff so I
[02:01:53] get some insanely harsh sculpts
[02:01:56] happening or I can bring it all the way
[02:01:58] up to one which makes the fall off non
[02:02:00] existent giving us the smoothest brush
[02:02:02] as possible for really faint changes to
[02:02:05] our landscape now a shortcut to
[02:02:09] increasing the brush size is to use the
[02:02:11] right bracket key on my keyboard so
[02:02:13] right bracket key will increase my brush
[02:02:16] size and left bracket key will decrease
[02:02:18] it very similar to photoshop shortcuts
[02:02:22] so that's the basics of the scull brush
[02:02:24] as a reminder if you ever want to get
[02:02:25] back the default values of any property
[02:02:27] in unre engine go to that property and
[02:02:30] select the arrow right next to it to
[02:02:32] reset it back to its default value now
[02:02:35] let's go over the smoothing brush and as
[02:02:38] you can guess if you have some really
[02:02:41] harsh Landscapes and you want to be
[02:02:42] smoother like right here it was really
[02:02:45] harsh since our falloff was not existent
[02:02:48] using the smooth brush I can smooth away
[02:02:52] those bumps in the
[02:02:54] landscape so pretty great and the next
[02:02:58] brush after that is the flatten brush so
[02:03:01] flatten brush is great for tering or
[02:03:03] maybe you're creating a game for example
[02:03:06] and let's say right here you need a flat
[02:03:09] area for your gameplay well to get a
[02:03:11] flat area of course we need to use the
[02:03:13] flatten brush which will just flatten
[02:03:15] our
[02:03:16] landcape it's also great we're creating
[02:03:19] Terraces so if I start my flat brush off
[02:03:22] right here notice how we have a higher
[02:03:25] Terrace and a lower one and right below
[02:03:28] that another
[02:03:30] one so we're very quickly able to create
[02:03:33] some complicated Landscapes with just
[02:03:36] these three brushes and these three
[02:03:38] brushes are the main brushes generally I
[02:03:41] don't really touch any of the other
[02:03:42] brushes except for very specific
[02:03:44] circumstances which we aren't going to
[02:03:46] be going over in this video now that's
[02:03:48] how you sculpt a landscape but how do I
[02:03:51] paint a landscape since right now we're
[02:03:53] using unreal's default material of
[02:03:56] course landscapes in real life are not
[02:03:57] made out of squares instead they're made
[02:03:59] up of grass dirt sand rocks and pretty
[02:04:02] much anything you would expect outside
[02:04:05] now I'm going to briefly go over how to
[02:04:07] create a very basic landscape
[02:04:09] material wrate the material under my
[02:04:11] stuff and call this one
[02:04:14] mcore landscape double click to open it
[02:04:17] up and I'm going to dock it up here so I
[02:04:20] can switch in between my level and and
[02:04:22] Landscape now the difference between a
[02:04:24] normal material and a landscape material
[02:04:27] is one node and that is landscape layer
[02:04:30] blend so select it and here we have the
[02:04:34] layer blend notice how we don't have any
[02:04:36] inputs that's because we need specify
[02:04:38] inputs in the details panel right here
[02:04:40] so the inputs are essentially going to
[02:04:42] be layers so you can have a grass layer
[02:04:44] a dirt layer a sand layer and then
[02:04:47] within your landscape editing mode we'll
[02:04:49] be able to paint on those individual
[02:04:51] layers on landscape so to add in a layer
[02:04:54] select your layer blend and under layers
[02:04:57] click on the add button and make sure
[02:04:59] you click on the triangles to see the
[02:05:02] drop down now for the first layer col us
[02:05:05] want grass and the second layer call
[02:05:09] this one dirt now this is just for
[02:05:12] demonstration so it's not going to look
[02:05:14] very good but to get the point across
[02:05:16] let's go find a grass texture and a dirt
[02:05:18] texture under starter content
[02:05:23] textures
[02:05:24] and I'm going to use tore
[02:05:27] ground also for
[02:05:30] dirt looks like we don't have a dirt so
[02:05:32] I'm just going to use the metal rust
[02:05:35] texture because that does look like dirt
[02:05:37] and it will get the point across so drag
[02:05:40] in metal rust as our dirt Now hook up
[02:05:45] grass right there and dirt and I'll put
[02:05:49] these into base color and let's press
[02:05:51] apply
[02:05:52] save everything jump back into landscape
[02:05:55] examples and now to apply the landscape
[02:05:58] material to our landscape we can't just
[02:05:59] drag our material onto the landscape
[02:06:01] like that instead in the details panel
[02:06:04] scroll down and get landscape material
[02:06:07] and drag on the landscape material to
[02:06:09] the slot right there and let go but we
[02:06:13] get a really weird black texture since
[02:06:15] we need to specify where these layers
[02:06:17] are right now unreal isn't picking any
[02:06:20] layers so it's just defaulting to Black
[02:06:23] hop back into your landscape mode by
[02:06:25] pressing shift and two and within paint
[02:06:28] we have our layer so we need to create
[02:06:30] our layers and store them somewhere
[02:06:31] within our content drawer so to create a
[02:06:34] layer click on the add button and you
[02:06:36] want to select weight Blended layer
[02:06:37] normal so select that it's going to ask
[02:06:39] us to create a new landscape layer info
[02:06:42] and it's going to automatically create a
[02:06:44] new folder for us where our map is
[02:06:46] located called our map name and shared
[02:06:48] Assets Now we could also create a new
[02:06:51] folder by right clicking and going new
[02:06:53] folder or we can pretty much save this
[02:06:55] anywhere else in our project but I'm
[02:06:56] just going to leave it as default value
[02:06:58] and also leave it at the default name
[02:07:00] it's generating which is grassor layer
[02:07:02] info click save now we have our layer
[02:07:05] right there and we can see our grass has
[02:07:06] been applied to our landscape let's do
[02:07:09] the same thing for dirt by clicking on
[02:07:10] the plus button and going wait Blended
[02:07:12] layer normal select that and for
[02:07:15] dirtcore layer also click on Save at the
[02:07:19] same location so now we have two layers
[02:07:21] layers in a folder that's right next to
[02:07:23] our maps and go to save all now
[02:07:26] obviously this landscape is too shiny so
[02:07:29] jump back in mcore landscape hold down
[02:07:31] one and left click to bring a constant
[02:07:33] scal or parameter and give it a value of
[02:07:35] one so we have complete roughness to get
[02:07:37] rid of that shine press
[02:07:39] apply and our landscape is looking
[02:07:42] better but I also think we should add in
[02:07:44] normal maps to give the texture a little
[02:07:47] bit of bump to it so come back into our
[02:07:49] landscape material
[02:07:52] and press control and space under
[02:07:54] textures so starter content textures
[02:07:57] let's find where the grass is which is
[02:08:00] right here drag out a normal map and
[02:08:02] let's find where the normal map is for
[02:08:04] rust and that is right there and drag
[02:08:07] that out so I want to blend between our
[02:08:10] normal Maps just like how we're blending
[02:08:12] between the base colors and I can do
[02:08:14] that by copying and pasting my layer
[02:08:16] blend which I can do with control and D
[02:08:17] to
[02:08:19] duplicate and plug up the normal map
[02:08:22] right there and plug up the rust normal
[02:08:25] map right there and put those both in a
[02:08:28] normal so now we have two layer Blends
[02:08:30] which are sampling from the same exact
[02:08:31] layers that we just created in our
[02:08:33] landscape editing mode and press
[02:08:38] apply now let's jump into
[02:08:41] dirt and lower the brush Sid just a
[02:08:43] little bit see the tool strength is at
[02:08:46] 0.3 holding that left Mouse button I'm
[02:08:49] now able to blend in between dirt
[02:08:52] and grass one thing I like to do
[02:08:54] whenever I'm creating my landscape is to
[02:08:56] get a human reference that's why I'm
[02:08:58] able to compare the size of my landscape
[02:09:00] next to human and this is especially
[02:09:02] helpful since one thing I want to do
[02:09:04] with M Landscape is add in texture
[02:09:07] tiling but it's hard to know how much I
[02:09:09] should tile this texture when there
[02:09:11] isn't a human reference so to get a
[02:09:13] human reference you want to come up to
[02:09:15] add and add feature or content pack and
[02:09:19] select the third person we can see that
[02:09:21] there's a mannequin right here which
[02:09:23] we're going to be using as our reference
[02:09:25] and select add to project so this will
[02:09:29] add a bunch of new assets to our project
[02:09:31] and specifically I want to use the
[02:09:34] Assets in character
[02:09:37] mannequins
[02:09:38] meshes and we can do skm unor Manny so
[02:09:42] drag that out to get a human size
[02:09:46] reference to compare our landscape
[02:09:49] textures
[02:09:50] to and we can place him right
[02:09:52] there so this human if I zoom in on the
[02:09:57] grass we can see that probably the grass
[02:10:00] is a little bit too small so let's fix
[02:10:02] that jump back into our landscape
[02:10:04] material and the way we change the
[02:10:06] tiling of any textures is the exact same
[02:10:09] way we did with mcore Master material so
[02:10:12] we grabbed the texture coordinates and
[02:10:14] we multiplied it by a parameter value so
[02:10:17] we were able to edit it in the instance
[02:10:19] of this material now I could recreate
[02:10:21] this from scratch for mcore landscape or
[02:10:24] I can highlight all of that press contrl
[02:10:27] and C go back into mcore landscape and
[02:10:30] control and V it now I can plug this up
[02:10:33] to grass and also I want to plug this up
[02:10:36] to the normal map of grass which is
[02:10:39] right here so if you remember both this
[02:10:41] texture and this texture handle grass
[02:10:44] since they're both being fed into the
[02:10:46] grass layers of the layer blend node so
[02:10:49] press apply and we won't notice any
[02:10:51] changes since we have to create a
[02:10:53] material instance of our landscape and
[02:10:55] apply to the landscape so right click go
[02:10:58] create material instance and drag this
[02:11:01] material instance onto our Landscapes
[02:11:03] with the landscape selected so just do
[02:11:06] that and then double click on our
[02:11:08] instance let's undock it and bring it
[02:11:12] into the maps right
[02:11:13] there click on
[02:11:16] size and I want to increase the size of
[02:11:20] my texture by decreasing the thaan so
[02:11:23] instead of one let's try
[02:11:26] 0.5 okay that looks better maybe even
[02:11:30] 0.3 okay I really like
[02:11:33] 0.3 so this was beforehand at one and
[02:11:36] now this is the tiling at
[02:11:39] 0.3 which makes the landscape look
[02:11:41] better now I also want to add in tiling
[02:11:45] features for our dirt so I can highlight
[02:11:49] this press contrl c contrl v V and paste
[02:11:52] it right there and plug this up to dirt
[02:11:55] and plug this up to normal map but if I
[02:11:58] press apply and go back into our
[02:11:59] material instance we have a pretty big
[02:12:02] issue right here and that is now our
[02:12:05] size controls both now let's come over
[02:12:08] to the dirt controls both our grass and
[02:12:12] dirt and we want to control those
[02:12:14] independently and the issue is in unreal
[02:12:17] for material parameters if you have two
[02:12:20] parameters with the same exact name then
[02:12:22] they're going to be treated the same
[02:12:23] within the material instance so the way
[02:12:26] you fix this is that you have to give
[02:12:27] each of these parameters a different
[02:12:28] name so call this one size grass and
[02:12:33] then call this one down here size dirt
[02:12:37] and press apply and now that should be
[02:12:39] different so we also get the dirt
[02:12:41] parameter within our instance so let's
[02:12:44] jump back into landscape
[02:12:46] example and press shift and two to go
[02:12:49] into landscape mode select dirt because
[02:12:52] I want to paintt a little bit of dirt
[02:12:54] right next to the mannequin so we can
[02:12:57] see what grass and dirt look like in
[02:12:59] relationship to our human scale
[02:13:02] reference now with dirt right there
[02:13:05] let's go increase it to
[02:13:09] 0.3 maybe even 0
[02:13:11] point
[02:13:13] actually I think 1.2 looks good so just
[02:13:17] a little bit more tiling with our dirt
[02:13:20] if you curious is how to make a really
[02:13:21] good landscape material I do have a
[02:13:23] landscape tutorial series on my YouTube
[02:13:26] channel while it is for unreal 4 pretty
[02:13:29] much all of it still applies to Unreal
[02:13:31] Engine 5 that was the very basics of
[02:13:33] Landscapes now we're going to go over
[02:13:35] how we can get assets from the meas
[02:13:37] scans Library so in case you don't know
[02:13:39] unreal already comes with thousands of
[02:13:42] free highquality assets ready to be used
[02:13:44] immediately in Unreal Engine we can get
[02:13:47] these assets through the quicko bridge
[02:13:48] plug-in which is already installed in
[02:13:51] unreal before we jump into Mega scans
[02:13:53] let's make some edits to our world so
[02:13:55] first off I'm going to get rid of my
[02:13:57] landscape material since I think it's a
[02:13:59] little bit distracting and I just want
[02:14:01] to focus on the mega scan assets so
[02:14:03] select my landscape scroll down to the
[02:14:05] landscape material slot and let's reset
[02:14:07] it back to the world grid by selecting
[02:14:10] the arrow right there there we go and I
[02:14:13] also want to lock my exposure with the
[02:14:15] postprocess volume so come into volumes
[02:14:18] postprocess drag it out
[02:14:21] and scroll up to exposure let's set it
[02:14:25] to manual and exposure compensation
[02:14:27] notice that there is no change right now
[02:14:29] because I need to make sure that
[02:14:31] infinite extend Unbound is turned on now
[02:14:35] I can increase the exposure compensation
[02:14:38] I found a value of 12 to be pretty good
[02:14:41] and I'm also going to raise the position
[02:14:45] of my sun so we get more light in the
[02:14:48] world okay so now that the sun was
[02:14:50] raised
[02:14:52] notice that the brightness of The Sun
[02:14:53] Also increased so exposure compensation
[02:14:56] I'm going to lower it to 11 or
[02:14:59] 11.5 all right great so let's go over
[02:15:01] how we can get access to the quickel
[02:15:03] bridge library and getting access is
[02:15:05] pretty simple you just want to come up
[02:15:07] to the add button and then select quixel
[02:15:10] bridge now if this is your first time
[02:15:12] logging into quixel Bridge it might ask
[02:15:14] you to log into your epic games account
[02:15:16] don't worry it's the same exact account
[02:15:19] that you created when downloading on
[02:15:20] real engine so just go into that and
[02:15:22] then you get access to right now at the
[02:15:24] time recording
[02:15:26] 16,680 assets which is absolutely
[02:15:29] amazing now for some reason you don't
[02:15:31] have quickel Bridge installed in a real
[02:15:33] engine then you want to go to the epic
[02:15:35] games launcher and come to Unreal Engine
[02:15:38] Library scroll all the way down to Vault
[02:15:41] and find the quickel bridge plugin once
[02:15:43] you found the quicksell bridge plugin
[02:15:45] click on install to engine and select on
[02:15:47] real Engine 5 although by default this
[02:15:49] plugin should be installed so you
[02:15:51] shouldn't have this issue but it's
[02:15:52] important to bring up just in case you
[02:15:54] don't see quickel bridge now let's open
[02:15:57] up quickel bridge and let's go over a
[02:15:59] simple example of bringing in a 3D
[02:16:01] object so to bring in a 3D object is
[02:16:04] pretty simple number one you want to
[02:16:05] find a 3D object that you like so
[02:16:09] maybe this rock right
[02:16:12] here then all I have to do is Select
[02:16:15] this rock and let me make my screen
[02:16:18] window just a little bit smaller hold
[02:16:21] down the left Mouse button and drag it
[02:16:23] into your world just like if it's a
[02:16:26] asset from the content
[02:16:28] browser and now we have our Rock in our
[02:16:31] world importing realistic assets into un
[02:16:34] real engine have never been this easy
[02:16:37] and if I press control and space we can
[02:16:38] see in our content folder that two new
[02:16:41] folders were created specifically Mega
[02:16:43] scans and Ms presets so Mega scans
[02:16:46] contains all our Mega scan assets that
[02:16:48] we get from bridge for example we have a
[02:16:50] folder called 3D assets and inside 3D
[02:16:53] assets we have another folder called
[02:16:54] mossi Forest Rock and right here are all
[02:16:57] the assets that make up specifically
[02:17:00] this rock right here now the other
[02:17:02] folder if we go back to content right
[02:17:05] next to Mega scans is Ms presets so Ms
[02:17:08] presets contains all the master
[02:17:11] materials that quickel bridge uses so if
[02:17:14] we go out into content back to Mega
[02:17:16] scans 3D assets MSI Forest Rock we'll
[02:17:19] see that the material that using is a
[02:17:21] material instance so it's not a material
[02:17:24] by itself if I scroll down to the
[02:17:26] material instance we can see what it's
[02:17:28] Master material is and it's using MMS
[02:17:31] default fuzz material and if I click on
[02:17:34] the magnifying glass it's going to jump
[02:17:36] to its location which is of course under
[02:17:38] Ms presets which contains all those
[02:17:41] Master materials and you also notice
[02:17:43] that we do get a bunch of parameters so
[02:17:45] we're going to go over all the main
[02:17:47] material parameters that quickel bridge
[02:17:49] provides to us which we will use
[02:17:51] consistently so to begin let's go over
[02:17:53] albo controls and I'm going to move my
[02:17:56] window off to the side so we can better
[02:17:57] see our assets so albo tint does exactly
[02:18:01] what the clor tint does that we just
[02:18:03] created for our own Master material so I
[02:18:06] can completely change the color of my
[02:18:08] asset I'm going to press cancel since I
[02:18:10] don't want to make any changes to my
[02:18:12] color right now and below that is albo
[02:18:14] controls now we don't see any albo
[02:18:17] controls right now since I need to click
[02:18:18] on the trigle icon to get a drop down so
[02:18:22] right here we have saturation brightness
[02:18:23] and contrast and they all do exactly as
[02:18:26] you would expect saturation increases
[02:18:28] the saturation of our asset bring it
[02:18:30] back to its default value of one
[02:18:32] brightness controls how bright the asset
[02:18:35] is and this is probably the parameter I
[02:18:37] use the most with mega skan assets
[02:18:39] especially if I'm trying to get a lot of
[02:18:41] different assets to blend together well
[02:18:43] I'm going to try to control their
[02:18:44] brightness to make sure they all have a
[02:18:46] similar value to each other and below
[02:18:49] that is contrast and all of these have a
[02:18:52] default value of one now below that is
[02:18:55] metallic generally I don't have to play
[02:18:57] with it because this asset isn't
[02:18:59] metallic but if you do want to override
[02:19:01] one of the metallic behaviors for
[02:19:03] example increase the base metallic from
[02:19:05] zero which is what it should be since
[02:19:07] this asset is a metallic to one and then
[02:19:09] bring metallic map override to zero now
[02:19:12] we can see that the asset is metallic
[02:19:14] although I wouldn't recommend you to do
[02:19:16] it but it is good to know that those
[02:19:18] options are there so I'm going to reset
[02:19:20] them to their default value and then
[02:19:22] below that is roughness so roughness
[02:19:25] controls how shiny the asset is exactly
[02:19:28] what we learned about during the PBR
[02:19:30] section of the material chapter so max
[02:19:33] roughness is at one if I bring this to
[02:19:36] zero then the rocks have no roughness
[02:19:38] and are really shiny I'm going to bring
[02:19:40] back the roughness by setting it back to
[02:19:42] one below that is normal strength which
[02:19:45] is like the flat and normal although now
[02:19:48] if we increase normal strength then
[02:19:50] normal increases and then if we
[02:19:52] decreases to zero then the normal map
[02:19:55] has no effect on our assets so obviously
[02:19:57] we do want to leave this at one so the
[02:20:00] normal map has a little bit of an effect
[02:20:02] so there's still a bunch of other
[02:20:04] parameters that we could play with but
[02:20:06] these are all the main ones that are
[02:20:07] needed for props just like this now
[02:20:10] let's go over how we import a surface
[02:20:12] material which is different from a prop
[02:20:16] since surfaces are good for a floor like
[02:20:20] this Cube
[02:20:23] and not necessarily meant for specific
[02:20:26] props so let's go into quicko
[02:20:30] bridge and let's find a nice
[02:20:33] surface for example
[02:20:35] brick decorative brick wall and we could
[02:20:39] click download although I do want to go
[02:20:41] over the different quality options so
[02:20:44] right now it's at the highest quality we
[02:20:45] have low medium high and highest low
[02:20:48] quality is 1K textures medium quality is
[02:20:51] 2K high quality is 4K and highest
[02:20:54] quality is 8k so I think generally
[02:20:57] unless you're really trying to go for
[02:20:58] the best looking render as possible I
[02:21:01] wouldn't go with AK textures the highest
[02:21:03] I would go with is 4K and click download
[02:21:07] so you're going to have to wait for this
[02:21:08] to
[02:21:09] download and once it is done downloading
[02:21:12] simply click the add button immediately
[02:21:15] we will see that our content browser
[02:21:18] opens up and we get our material right
[02:21:21] there the material functions like any
[02:21:23] other material you can drag it and let
[02:21:25] go to place it on an object so now we
[02:21:29] have our brick in our world I can select
[02:21:32] this brick and open up its material
[02:21:34] instance to see what parameters we have
[02:21:35] and the parameters are pretty much
[02:21:37] exactly the same as beforehand except I
[02:21:40] want to point out what Global does so
[02:21:43] Global controls our tiling if I click on
[02:21:46] tiling offset and then click on the drop
[02:21:48] down we see tiling X and Ty y if I want
[02:21:51] to tile it more on the X Direction I can
[02:21:54] increase this if I want to tile it more
[02:21:56] on the y direction I can increase this
[02:21:59] or I can decrease the tiling in the X
[02:22:02] and Y to make our texture larger I can
[02:22:05] even offset it so move this texture in
[02:22:08] the x or y AIS of our object's texture
[02:22:12] UVS and if you really want to we even
[02:22:15] have the ability to rotate this although
[02:22:19] I'm just going to leave it at zero
[02:22:21] if you ever want to reset all the values
[02:22:23] at once then click on the top arrow and
[02:22:26] here is a neat trick that I do want to
[02:22:28] point out let's say you want to go to
[02:22:30] the folder that this asset is located in
[02:22:33] but you don't want to have to navigate
[02:22:35] to that folder manually go through all
[02:22:38] your content folders and try to find
[02:22:39] where this asset is located well what
[02:22:42] you could do is in the details panel
[02:22:44] click on the magnifying glass right next
[02:22:46] to that object which will jump to that
[02:22:49] location or the shortcut is to press
[02:22:52] controll and B at the same time to jump
[02:22:54] to that object's location so if you
[02:22:56] select any object for example the human
[02:23:00] reference press control B it's going to
[02:23:02] jump to that location so that is a
[02:23:04] shortcut that we will be using a lot
[02:23:07] especially when we're creating our
[02:23:08] medieval village now I think is a good
[02:23:10] time to go over the foliage mode and to
[02:23:12] go into foliage mode simply switch from
[02:23:14] select mode below landscape to foliage
[02:23:17] so folage mode is great because it
[02:23:19] allows us to to paint full around our
[02:23:21] world very quickly and populate our
[02:23:23] world with grass trees rocks and pretty
[02:23:26] much all the small assets you would
[02:23:28] expect to be in an environment now I'm
[02:23:31] going to press shift one to get out of
[02:23:32] folage mode because we first need
[02:23:34] foliage and where are we going to get
[02:23:36] our foliage hopefully you could guess
[02:23:38] quickel Bridge so in quickel Bridge come
[02:23:41] to 3D plants and we have a bunch of
[02:23:43] plants to select from I specifically
[02:23:45] want to find Fern just as an example
[02:23:48] although you can pick any of the plants
[02:23:50] are available to us and I'm going to
[02:23:53] select common Fern now just like when we
[02:23:56] were downloading the materials we have
[02:23:58] different quality options so I could use
[02:24:00] low quality which is 1K medium quality
[02:24:03] 2K or high quality which is 4K and I'm
[02:24:06] going to stick to high quality right now
[02:24:08] let's download
[02:24:09] it and once it's done downloading add to
[02:24:12] your project with the add button and now
[02:24:15] this fern plant is successfully inside
[02:24:17] of our project I can drag this out see
[02:24:22] exactly what assets were made available
[02:24:24] to us unlike other Mega scan assets
[02:24:26] foliage can have multiple objects so
[02:24:28] here we have three different ferns and
[02:24:30] let's open up the material instance to
[02:24:32] see what options are available to us we
[02:24:35] have a couple ways to open up our
[02:24:36] foliages material instance number one I
[02:24:39] could go into the details panel with any
[02:24:41] of these selected and select the first
[02:24:44] material available to us or I can press
[02:24:46] contrl and B to jump to that object's
[02:24:48] location which is our Fern folder
[02:24:51] and select the material right here I
[02:24:53] want to make sure that I select a
[02:24:54] material that doesn't have billboard
[02:24:55] inside of it so select the non-
[02:24:58] billboard one and this will be our main
[02:25:00] material instance so I'm going to go
[02:25:02] over all the main parameters of
[02:25:05] foliage so first off we have color
[02:25:08] overlay which is essentially functions
[02:25:10] just like our color tints so if I want
[02:25:13] to make my Fage a little bit blue or red
[02:25:16] this is where I make that change and
[02:25:17] when I do make it red it kind of gives
[02:25:19] it a fall fig which is pretty neat press
[02:25:21] cancel since I don't want to make those
[02:25:23] changes and right above that is color
[02:25:26] variation because you wouldn't expect
[02:25:28] each Fern to be the same exact color
[02:25:30] there would be a little bit of variation
[02:25:32] between all the different ferns and
[02:25:34] that's exactly what color variation does
[02:25:37] if I bring this up to something large
[02:25:38] like 0.5 notice how each Fern has its
[02:25:41] own individual tint now normally you
[02:25:43] don't want it to be this intense you'd
[02:25:46] want it to be just a little bit like 0.1
[02:25:48] or even 0.05
[02:25:51] so that there's just a little bit of
[02:25:53] variation between all the objects and
[02:25:57] below that is roughness intensity so
[02:25:59] roughness intensity is just like our
[02:26:01] Master material's roughness strength so
[02:26:04] bringing it down to zero means our
[02:26:06] object is very shiny and bring it up to
[02:26:09] let's go five we'll make our ferns
[02:26:11] pretty rough let's see if it has default
[02:26:13] value of one and below that is normal
[02:26:17] intensity which functions like normal
[02:26:19] strength bring it to zero gets rid of
[02:26:21] the normal Maps so this is with the
[02:26:24] normal maps and this is without or
[02:26:26] bringing it to five gives ourselves
[02:26:28] really intense normal Maps but I'm going
[02:26:31] to leave it at one for now which is its
[02:26:33] default and after that we have
[02:26:35] translucency strength and
[02:26:38] desaturation so light doesn't just stop
[02:26:41] when it hits a leaf instead light goes
[02:26:43] into the leaf it bounces around a little
[02:26:45] bit and then it leaves a leaf so that is
[02:26:47] where translucency comes in translucency
[02:26:50] is how much light should Bounce Around
[02:26:52] inside the leaf it's at a value of seven
[02:26:55] if I bring this to zero then we have no
[02:26:57] light bouncing within the leaf if I
[02:26:59] breing up to one then a little bit two a
[02:27:01] little bit more five and finally the
[02:27:04] default of seven and below that is
[02:27:07] translucency desaturation notice how if
[02:27:09] I bring down to zero then it becomes
[02:27:11] completely desaturated now the light
[02:27:13] inside the leavea is white or if I bring
[02:27:17] into one then there was no desaturation
[02:27:20] when the light was bouncing in the leaf
[02:27:22] so I'm going to leave it at the default
[02:27:23] value of
[02:27:25] 0.95 and finally we have probably the
[02:27:28] most important parameter and that is
[02:27:30] enable grass wind so turn this on and
[02:27:34] then set it to true so now our plants
[02:27:37] have wind which adds a whole another
[02:27:40] level of realism we can control the wind
[02:27:42] intensity by of course playing with it
[02:27:44] right here so if I bring it to zero then
[02:27:46] there is no wind and it default is 0.15
[02:27:50] maybe if we're inside a hurricane make
[02:27:53] this 0.5 and now it's super intense so I
[02:27:58] think 0.15 is a little bit too intense
[02:28:00] by default so I'm going to bring this
[02:28:01] down to
[02:28:03] 0.05 for just some really faint
[02:28:06] movement you probably notice throughout
[02:28:07] this entire time is that the foliage
[02:28:09] pops a little bit as I go further away
[02:28:12] or closer up to it and this popping is
[02:28:15] level of detail so we can better see
[02:28:17] level of detail by opening up the
[02:28:19] foliage in its static mesh editor and
[02:28:23] right here we have LOD
[02:28:26] lod0 is what the fge will look like when
[02:28:29] you're really up close to it and
[02:28:31] actually let me go uncheck the grid so
[02:28:33] we can better see this led1 is what it
[02:28:36] will look like when we get a little bit
[02:28:38] further away when the camera gets even
[02:28:40] further we go
[02:28:41] lod2 further lod3 and finally we go to
[02:28:45] LOD 4 and as we increase lods as the
[02:28:49] camera gets further and further away we
[02:28:51] lose more and more geometry until we get
[02:28:55] this weird thing right here which is
[02:28:57] essentially just a picture of the fern
[02:28:59] which is pointed at the camera so this
[02:29:01] material right here is what the
[02:29:03] billboard is so that's why we weren't
[02:29:06] editing this material since this
[02:29:08] material is completely different from
[02:29:10] our main material instance if we did
[02:29:13] edit this then we wouldn't see any
[02:29:14] changes right now in our world since
[02:29:17] we're zoomed up pretty close to our
[02:29:18] ferns we would know to change if we're
[02:29:21] far away and hopefully you can see it in
[02:29:23] YouTube all of our ferns just transition
[02:29:26] to a billboard which is the furthest LOD
[02:29:28] possible so that's important to point
[02:29:31] out that if you do make a major change
[02:29:33] to these ferns for example let's give
[02:29:36] them a color tint of blue we have blue
[02:29:40] ferns but if we go away our Billboards
[02:29:42] are green so we also have to go into the
[02:29:45] billboard material instance which is the
[02:29:47] second material and change this color to
[02:29:51] Blue to match the main material instance
[02:29:55] so we get a better transition now that
[02:29:58] looks terrible so I'm going to change it
[02:30:00] back to its default value of gray and
[02:30:03] right here change it also back to Gray
[02:30:05] and I can exit out of all of these and
[02:30:08] save everything because now that we've
[02:30:11] gone over the material parameters for
[02:30:13] foliage we can talk about the folage
[02:30:16] mode editor which we can open with the
[02:30:19] shortcut shift three right here is where
[02:30:22] we get all the assets that I want to
[02:30:23] paint onto our landscape we can see that
[02:30:26] it was already autop populated by the
[02:30:28] Fage that we downloaded from Mega scans
[02:30:31] the reason why is because unreal is
[02:30:32] smart enough and mega scans is smart
[02:30:34] enough to know that if we're downloading
[02:30:36] folage odds are we want to paint it now
[02:30:39] if we don't have anything right here
[02:30:41] then we could drag any 3D object into
[02:30:44] the Fage editor by just selecting them
[02:30:46] in the content drawer hovering over and
[02:30:48] adding them as a foliage type
[02:30:50] now I'm not going to add them as a Fage
[02:30:52] type because they're already added right
[02:30:53] here so if I select any of them we see
[02:30:57] that I get a details panel down here
[02:30:59] with a bunch of options for how I want
[02:31:01] to paint this specific object now if you
[02:31:03] do not see these options that's because
[02:31:05] you have to come up here and make sure
[02:31:07] this button is blue so to start painting
[02:31:10] make sure you have paint selected and
[02:31:12] you'll notice that nothing is happening
[02:31:14] that's because I need to activate right
[02:31:16] here what foliage I want to paint down
[02:31:19] so I need to tell on real exactly what
[02:31:20] assets I want to paint so for example if
[02:31:23] I just want to paint this asset right
[02:31:25] here then hover over the assets icon and
[02:31:28] in the top left hand corner make sure
[02:31:30] it's turned on so now this is going to
[02:31:33] Glow while all the other ones are a
[02:31:35] little bit darker and that tells me that
[02:31:37] I can paint it so come to paint and now
[02:31:40] hold down left Mouse button and I'm
[02:31:43] painting this foliage around and wait a
[02:31:45] little bit for the shaders to get pile I
[02:31:48] want to paint all three then make sure
[02:31:51] all three of them are activated so now
[02:31:54] I'm painting a lot of them down if I
[02:31:57] ever want to get rid of these or erase a
[02:31:59] specific Fage type make sure that Fage
[02:32:01] type is selected and hold down shift to
[02:32:04] erase them so it is pretty simple I can
[02:32:08] decrease the brush size by coming up
[02:32:10] here or I can use the shortcuts from the
[02:32:14] landscape mode which are the left
[02:32:16] bracket key to decrease brush size and
[02:32:18] right bracket key to increase the brush
[02:32:21] size I even have access to paint density
[02:32:23] so right now it's at 0.5 if I want to
[02:32:26] paint down more foliage then I can
[02:32:28] increase this to one and I'm paint a lot
[02:32:30] more or if I don't really want to paint
[02:32:33] that much down then set to 0.1 we're
[02:32:36] just going to paint a little bit hold on
[02:32:38] shift and I can always erase everything
[02:32:41] that I've already
[02:32:43] done and of course if you don't want to
[02:32:45] paint a specific Fage type just make
[02:32:47] sure you have that unchecked and now
[02:32:49] we're only going to paint this one and
[02:32:51] this one so if you want to quickly
[02:32:53] select all the Fage types then you can
[02:32:56] press contrl and a to select all so in
[02:32:59] our real engine crl a is select all and
[02:33:02] then in the top left hand corner you can
[02:33:04] uncheck it to uncheck them all and then
[02:33:07] check it again to check them all so
[02:33:09] that's a nice shortcut and you can also
[02:33:11] hold down control to select multiple
[02:33:14] objects or you can hold shift to select
[02:33:17] objects in a row so now that I have them
[02:33:19] all selected I want to edit the
[02:33:21] properties down here but I want to edit
[02:33:23] the properties all at once so I'm going
[02:33:25] to press contr and a to select all of
[02:33:27] them and we have density down here green
[02:33:30] paint density all the way up to
[02:33:32] one and we can see that yeah this is
[02:33:35] pretty dense but what if I want this to
[02:33:36] be even more dense well down here for
[02:33:39] density I can increase this from 100 to
[02:33:42] 200 so this should be twice as dense we
[02:33:45] can see that's already pretty dense even
[02:33:49] take this up another notch to 500 and
[02:33:52] now we are going to be painting in a lot
[02:33:55] of
[02:33:56] ferns but these ferns still look a
[02:33:58] little bit unrealistic there's two
[02:34:00] reasons number one I think the variation
[02:34:02] of our ferns is a bit too much so let's
[02:34:04] jump back into our material instance and
[02:34:07] for color variation I'm going to lower
[02:34:09] that from 0.05 to
[02:34:12] 0.01 okay so that's better but all the
[02:34:16] ferns have the same exact size and pl PL
[02:34:19] never have the same exact size normally
[02:34:22] they have different sizes depending on
[02:34:24] where they're placed or how old they are
[02:34:26] in their lifespan so let's jump back
[02:34:29] into folage mode with shift and three
[02:34:32] and select all of them now I'm going to
[02:34:33] delete them all scroll down and for
[02:34:38] scale X let's have a random range for
[02:34:41] each time we paint the foliage from
[02:34:44] 0.5 to a Max of two so now if I paint
[02:34:49] and actually hold on shift decrease the
[02:34:52] density from 500 to 100 so we can better
[02:34:55] see each individual
[02:34:57] Fern we will see that we have a very
[02:35:01] wide range of sizes so some ferns are
[02:35:04] small and some ferns are larger than the
[02:35:07] other ones also if you enjoy placing
[02:35:11] assets by painting them but let's say
[02:35:14] for example there's one asset and you
[02:35:16] don't like where it's placed but you
[02:35:18] don't want to delete all the assets that
[02:35:20] are around it well instead of using
[02:35:23] paint you can use select and then you
[02:35:25] can grab that individually and move it
[02:35:27] away so you can still move individual
[02:35:31] objects and even scale them and rotate
[02:35:34] them despite using the paint mode so
[02:35:37] just keep that in mind that you still
[02:35:38] have a lot of control over the placement
[02:35:40] of your objects and it's also important
[02:35:43] to point out that let's say for example
[02:35:46] I'm painting and I only want to paint on
[02:35:48] my landscape and then I go on top of a
[02:35:50] mesh and then I start painting on top of
[02:35:52] my mesh by default also when I now move
[02:35:55] this mesh around we can see that that
[02:35:58] foliage is stuck to that mesh so if you
[02:36:01] do not want that to happen I'm going to
[02:36:03] press contrl and Z to get rid of that
[02:36:05] press shift three make sure under
[02:36:07] filters that static meshes is turned off
[02:36:10] so now what I'm painting I'm only
[02:36:12] painting on top of my Landscapes and not
[02:36:14] on top of the static meshes so that the
[02:36:17] very basics of foliage in Unreal Engine
[02:36:18] 5 we're going to be painting a lot of
[02:36:21] foliage when it comes to our final
[02:36:22] environment build towards the end of
[02:36:24] this video now it's time to talk about
[02:36:26] one of the main features of uv5 and that
[02:36:29] is nanit geometry so nanit geometry is a
[02:36:31] brand new way of rendering geometry that
[02:36:34] allows for a near infinite amount of
[02:36:36] source polygons on our screen at any
[02:36:38] time so this means we could get high
[02:36:41] quality movie assets rendering in real
[02:36:44] time which was impossible beforehand and
[02:36:47] now I know that might sound a little bit
[02:36:49] too good to be true so I have two
[02:36:51] examples we're going to jump into to
[02:36:53] demonstrate the power of nanites right
[02:36:55] now I have the Unreal Engine 5 demo
[02:36:57] project downloaded you can download this
[02:36:59] project within the epic games launcher
[02:37:01] under samples and it's called Valley of
[02:37:03] the Ancients so if you want to check
[02:37:05] this out then you can download it right
[02:37:06] now although do keep in mind that this
[02:37:09] project is 100 gbt large since we're
[02:37:11] using really dense models because nanite
[02:37:13] allows us to do that so this entire
[02:37:16] desert is made possible with nanite and
[02:37:19] we can see nanite in action by coming up
[02:37:21] to LIT down here to nanite visualization
[02:37:23] and selecting triangles so every color
[02:37:27] you see is an individual triangle is an
[02:37:30] individual polygon and notice how when I
[02:37:32] zoom in on any of these rocks or Cliffs
[02:37:35] our triangles get denser and denser as I
[02:37:36] zoom in and when I zoom out the
[02:37:39] triangles get larger and larger so this
[02:37:41] is all possible due to nanite beforehand
[02:37:44] in unreal 4 using geometry that is this
[02:37:47] dense was not possible now do keep in
[02:37:50] mind that at the time of recording this
[02:37:51] video nanite only works for solid static
[02:37:54] meshes that do not deform so for example
[02:37:57] it works for rocks or for Cliffs but it
[02:38:00] doesn't work for foliage epic games is
[02:38:02] aware of this issue and they're right
[02:38:03] now working on it so maybe if you're
[02:38:05] watching this in the future then nanite
[02:38:07] works for grass and trees but for now it
[02:38:09] only works for solid static meshes and
[02:38:12] another cool feature of nanite
[02:38:13] specifically for this sample
[02:38:15] project is that and if I increase my
[02:38:17] camera speed the there is no Landscapes
[02:38:21] whatsoever everything you see right here
[02:38:23] is a nanite static mesh so the ground is
[02:38:26] not a landscape it's a collection of
[02:38:28] static meshes that are layered on top of
[02:38:30] each other to make it look like the
[02:38:32] ground is one landscape so here's
[02:38:34] another example demonstrating nanites so
[02:38:37] right in front of you is a doughnut I
[02:38:38] made in Unreal Engine and this doughnut
[02:38:40] is made up of about 30,000 different
[02:38:43] polygons here we have that same doughnut
[02:38:46] but copy and pasted over 100,000 times
[02:38:50] and as we can see my frame rate is about
[02:38:52] 5 to 10 frames per second which is
[02:38:54] obviously unplayable and the reason why
[02:38:56] is because these Donuts aren't making
[02:38:58] use of nanite so to enable nanite on any
[02:39:01] static mesh simply find where that
[02:39:03] static mesh is within the content drawer
[02:39:05] as a reminder a shortcut is to select
[02:39:07] that static mesh and press contrl MB to
[02:39:09] jump to its location and to activate
[02:39:12] nanite right click on the static mesh
[02:39:15] come up to nanite and select enabled so
[02:39:18] it is that easy to enable nanite and now
[02:39:21] here's that same environment but all the
[02:39:23] donuts are nanite and we're hovering
[02:39:25] around 40 to 60 frames per second so we
[02:39:28] went from 10 all the way up to 60 frames
[02:39:30] per second which is amazing we can even
[02:39:33] come up to LIT n visualization and
[02:39:36] select triangles to double check that
[02:39:38] this is all using nanite
[02:39:40] geometry so I finally jumped back into
[02:39:43] our first project and as a reminder to
[02:39:45] enable nanit all you have to do is
[02:39:47] select the static mesh press control and
[02:39:50] B to find out where that static mesh is
[02:39:51] within your content drawer and right
[02:39:53] click and select
[02:39:55] enabled now nanite is enabled for this
[02:39:58] asset here's a tip we can see what
[02:40:01] assets have nanite enabled by coming up
[02:40:03] to LIT nanite visualization and instead
[02:40:06] of clicking on triangles which has been
[02:40:08] showing us how many Poes are on a mesh
[02:40:10] we can select mask so everything that's
[02:40:13] green is using nanite and everything
[02:40:15] that red is not using nanite as a
[02:40:18] reminder at the time of recording this
[02:40:20] video nanite only works for solid static
[02:40:22] meshes like the rock right here it
[02:40:25] doesn't work for Fage although that will
[02:40:27] be changing so maybe in the future you
[02:40:28] can enable nanite on Fage and make that
[02:40:31] a lot more performant than what it is
[02:40:32] right now we can even download a nanite
[02:40:35] version of this object so nanite will
[02:40:38] automatically be enabled from Mega scans
[02:40:40] to do so let's hop back into quickel
[02:40:42] bridge and I specifically want to
[02:40:44] download let's go Nordic formation type
[02:40:48] that in and I think it is this mesh
[02:40:51] right here so Nordic Beach formation and
[02:40:54] instead of selecting high quality medium
[02:40:56] quality or low quality we will select
[02:40:58] Nan quality and click on download now
[02:41:01] this will take a while since Nan quality
[02:41:03] is downloading the best quality possible
[02:41:06] which is a very very high resolution
[02:41:08] mesh and now that's downloaded click on
[02:41:11] ADD so a new window will pop up with
[02:41:14] your mesh so I'm going to exit out a
[02:41:16] bridge and drag this out into my world
[02:41:20] it might take a while for all the
[02:41:21] shaders to
[02:41:22] compile and we have a nanite mesh we can
[02:41:26] see how Den this meshes by going into
[02:41:28] wireframe View mode with alt and two so
[02:41:31] this is how dense a nan meshes compare
[02:41:34] this to downloading a mesh at medium
[02:41:36] quality like these rocks right here
[02:41:38] compared to nanite Quality obviously
[02:41:40] nanite is a lot better we get all this
[02:41:44] small detail within the Rocks which
[02:41:46] really helps make it realistic the only
[02:41:49] ISS issue is since we're downloading AK
[02:41:51] textures and a high resolution mesh it's
[02:41:53] going to take up a lot of disc space but
[02:41:55] if you're not worried about large
[02:41:56] project files then I would download
[02:41:58] everything as nanite since there is no
[02:42:01] performance cost and in a lot of cases
[02:42:03] it's actually more performant to use
[02:42:04] nanite meshes then non- Nite meshes so
[02:42:08] here's what we're going to do is that I
[02:42:09] want to compare all the different
[02:42:11] quality types that we're able to
[02:42:12] download from Mega scans so I'm going to
[02:42:15] jump back into quixel bridge and
[02:42:17] download this same asset but download
[02:42:20] the low quality medium quality and high
[02:42:21] quality to compare them all so here are
[02:42:24] all the different qualities for this
[02:42:25] asset and to better see the difference
[02:42:28] between them I'm going to press alt and
[02:42:30] two to go into wireframe View mode and
[02:42:32] our landscape is right now interfering
[02:42:34] with us analyzing the wireframes of our
[02:42:36] assets so I can select the landscape and
[02:42:40] hide it with h so H is a shortcut to
[02:42:43] hide an asset without having to navigate
[02:42:45] to it within the world outliner and
[02:42:47] selecting the IE icon I can also press
[02:42:49] control and H to unhide an asset so
[02:42:52] click on it press h to hide it and
[02:42:54] control h to unhide it so I'm going to
[02:42:56] leave that hidden and over here we have
[02:42:58] the lowest quality it's pretty
[02:43:00] noticeable that there's not that many
[02:43:02] polygons on this asset and the Shadows
[02:43:04] from our directional light make it very
[02:43:06] noticeable that this asset is pretty low
[02:43:08] poly now right next to it is medium
[02:43:11] quality so medium quality has a little
[02:43:12] bit more poly and it's at 2K while low
[02:43:15] quality was at 1K and next to that is
[02:43:18] high quality so high quality obviously
[02:43:21] has a lot more poly and the textures are
[02:43:23] also at 4K and finally we get Nite with
[02:43:26] 8K textures and the highest poly count
[02:43:30] possible so this is the source poly
[02:43:31] counts that are directly from the scan
[02:43:34] these are the kind of assets you would
[02:43:35] see in movies not in video games but
[02:43:38] because nanite is enabled we are able to
[02:43:40] use them in our project so those are the
[02:43:43] different quality selectors one thing I
[02:43:45] do want to point out is that notice if
[02:43:47] we pay attention to our high quality ass
[02:43:49] ass as I zoom out the polygon shift
[02:43:52] until I'm so far out that basically
[02:43:55] these three assets are using the same
[02:43:57] amount of polygons that's because megaan
[02:43:59] assets when not using Nite use level of
[02:44:02] detail so press contrl h to unhide the
[02:44:04] landscape and I can open up my asset by
[02:44:08] pressing control and B to jump to that
[02:44:10] asset's location in the content drawer
[02:44:12] and then double clicking on the asset to
[02:44:13] open up the static mesh editor or as a
[02:44:16] shortcut instead of having to navigate
[02:44:18] to the this location in the content
[02:44:20] browser I can press contrl and E to open
[02:44:23] it up so make sure you have any asset
[02:44:26] selected for example the medium quality
[02:44:28] 1 and press contrl and E to open up that
[02:44:31] specific asset now I'm going to dock it
[02:44:33] up here so I get a better look of my
[02:44:35] static mesh if I press alt and two to go
[02:44:38] into wireframe View mode zoom in we see
[02:44:40] that this is the asset's highest poly
[02:44:43] version and as the camera zooms away it
[02:44:46] slowly starts to transition into to
[02:44:49] lower and lower lods and we can see each
[02:44:52] of these individual lods up here so lod0
[02:44:56] is the highest one one is lower two is
[02:45:00] even lower and finally three is the
[02:45:03] lowest so this is how we used to make
[02:45:05] our assets more performant back before
[02:45:08] nanite but since nanite does exist there
[02:45:11] really is no reason why I can select all
[02:45:14] three of my static meshes press contrl
[02:45:16] and B to select all of them in the cont
[02:45:19] your right click and enable nanites so
[02:45:22] save
[02:45:23] everything and pressing alt and two you
[02:45:26] see that we no longer get level of
[02:45:28] detail but what we do have is automatic
[02:45:31] level of detail that's being generated
[02:45:34] from nanites so even when you have very
[02:45:36] low poly meshes it's still recommended
[02:45:39] that you enable nanites now it's time to
[02:45:41] start programming u5 and in case you
[02:45:43] forgot unru engine is a video game
[02:45:45] engine so of course programming is going
[02:45:47] to be a pretty big part of
[02:45:49] but Unreal Engine handles programming a
[02:45:51] little bit differently compared to other
[02:45:53] video game engines instead of having
[02:45:55] lines of code we write to tell the
[02:45:57] engine what to do we instead have blocks
[02:45:59] of nodes and we connect these nodes to
[02:46:02] each other to create logic these nodes
[02:46:04] in Unreal Engine are called Blueprints
[02:46:07] and blueprints is unreal's visual
[02:46:09] scripting language now in my opinion
[02:46:12] blueprints are a lot easier and a lot
[02:46:14] faster than traditional ways of coding
[02:46:16] like an Unreal Engine where we would
[02:46:18] have to type everything out using C++
[02:46:21] even if you don't plan on programming
[02:46:23] anything I still highly recommend that
[02:46:25] you learn blueprints because blueprints
[02:46:27] is literally everywhere inside the
[02:46:29] engine it's what we use to connect the
[02:46:31] different parts of the engine to each
[02:46:33] other so it's an essential skill to know
[02:46:35] if you do want to learn on real engine
[02:46:37] and with all that being said let's learn
[02:46:39] blueprints by creating our first video
[02:46:41] game in ue5 to begin before we do
[02:46:44] anything let's duplicate the current
[02:46:46] level we have open and create our game
[02:46:48] Within our new duplicat level so if we
[02:46:51] come up to top leftand Corner we can see
[02:46:53] the name of our level which is called
[02:46:55] landscape example if you remember we
[02:46:57] created it within my stuff and Maps so
[02:47:01] since landscape example and Landscape
[02:47:03] example up there have the same exact
[02:47:05] name that means that this level is the
[02:47:07] level we currently have opened so I'm
[02:47:10] going to select that level and press
[02:47:11] contrl and D at the same time to
[02:47:13] duplicate now it's going to ask for a
[02:47:15] new name I'm going to call this one game
[02:47:18] map now we can rename any assets within
[02:47:21] the content drawer by right clicking and
[02:47:23] going to rename also the shortcut is fn2
[02:47:27] but I like the current name so I'm not
[02:47:28] going to do that now I'm going to double
[02:47:30] click and save selected to open up our
[02:47:33] new level and here we have the map we
[02:47:36] will be editing to create our very first
[02:47:38] game so to play a game in Unreal Engine
[02:47:41] click the play button up here in the
[02:47:43] toolbar so pressing it we'll start
[02:47:45] playing our game but we can't control
[02:47:46] our game right now since I need to click
[02:47:48] into the the viewport and now I get full
[02:47:50] control over the game so I can press the
[02:47:52] Escape key to stop playing my game so to
[02:47:55] play a game click the play icon and to
[02:47:57] control the game click into the viewport
[02:48:00] we don't have our Mouse anymore and
[02:48:02] that's because to stop playing you need
[02:48:04] to click on the Escape key so you
[02:48:06] probably notice that our controls for
[02:48:08] our game were pretty basic since it's
[02:48:10] just a w ASD Keys just like the viewport
[02:48:13] controls and that's because we don't
[02:48:15] have any characters or gameplay elements
[02:48:17] set up yet so in order to set up a
[02:48:19] gameplay element we first need access to
[02:48:22] the world settings right now we don't
[02:48:24] have any world settings tab as a
[02:48:25] reminder to get the world settings
[02:48:27] window come up to Windows and select
[02:48:30] World settings and now we're going to
[02:48:31] get a brand new window right here which
[02:48:32] we can switch in between details and
[02:48:34] World settings so right here we have
[02:48:36] game mode override this is where we set
[02:48:39] exactly what game we want to play and at
[02:48:42] the drop down we should have bpor thir
[02:48:44] person game mode now if you don't have
[02:48:46] bpor thir person game mode that's
[02:48:48] because you didn't add the third person
[02:48:50] content yet which is the content that
[02:48:53] includes this character right here so if
[02:48:55] you want to get our character and our
[02:48:57] game mode press control space go to add
[02:49:00] and add feature or content pack and
[02:49:03] select third person then click on add to
[02:49:05] project now I've already done that which
[02:49:08] is why I get bpor thir person game mode
[02:49:11] which is located under one of the files
[02:49:13] that were created when I added in the
[02:49:15] third person content under third person
[02:49:18] and blueprints so it's this one right
[02:49:20] here alternatively instead of selecting
[02:49:22] it from the drop down I can also hold
[02:49:24] down the left Mouse button and drag it
[02:49:26] onto it and let go so now if I press
[02:49:28] play we see that we get a third person
[02:49:31] character I can use the W ASD keys to
[02:49:33] move around space to jump and the mouse
[02:49:36] to rotate my camera around my character
[02:49:39] and as a reminder I can press the Escape
[02:49:41] key to get out alternatively as a
[02:49:44] shortcut instead of coming up to my
[02:49:45] toolbar and pressing the play button I
[02:49:47] can press Alt and P to automatically
[02:49:50] play my game so that's alt and P to
[02:49:52] start playing my game without having to
[02:49:54] come up to the toolbar and also notice
[02:49:56] how when I do click into my viewport I
[02:49:59] no longer get access to the mouse cursor
[02:50:01] if I ever want to get back the mouse
[02:50:03] cursor while playing my game I could
[02:50:05] press shift and F1 at the same time so
[02:50:07] that's shift F1 to bring back my mouse
[02:50:09] cursor and instead of pressing the
[02:50:11] Escape key I could come up to the stop
[02:50:14] button and press that right there to
[02:50:16] escape my game so let's open up our
[02:50:19] first blueprint and specifically the
[02:50:21] blueprint we're going to open up is the
[02:50:23] character blueprint we're right now
[02:50:24] controlling so you can find the
[02:50:26] character blueprints by coming into
[02:50:29] third person and selecting blueprints so
[02:50:33] it's right next to bpor thir person game
[02:50:35] mode it's bpor thir person character so
[02:50:38] double click on it to open up our first
[02:50:40] blueprint now we're currently on the
[02:50:42] event graph don't worry we're going to
[02:50:44] go over what the event graph does in
[02:50:45] just a bit but to see all the objects
[02:50:48] that make up our blueprint select the
[02:50:50] viewport now the objects that make up a
[02:50:53] blueprint are called components and I
[02:50:55] can select a component just like on the
[02:50:58] level editor also just like the level
[02:51:00] editor we have the same exact controls
[02:51:02] so I hold down the right Mouse button to
[02:51:04] look around and move and I can select
[02:51:07] any of the objects press the F key to
[02:51:09] focus on it hold down the alt and left
[02:51:11] Mouse button to rotate and ALT and right
[02:51:14] Mouse button to zoom in and out so this
[02:51:17] is basically just like our level editor
[02:51:19] but for our blueprints also we have the
[02:51:22] equivalent of a world outliner so on the
[02:51:25] top left hand corner is the components
[02:51:27] tab which contains all the components
[02:51:29] inside of our blueprint just like an
[02:51:32] object in our world I can select a
[02:51:34] component and change its properties in
[02:51:36] the details panel for example right now
[02:51:39] we're using skm Quinn as our skeletal
[02:51:42] mesh which is the femo mesh if I want to
[02:51:44] change it I can select skam mcore Quinn
[02:51:47] and then select SK M _ Manny to change
[02:51:50] it to the male one so now if I play my
[02:51:52] game we can see that we have a different
[02:51:55] body so now let's jump into the event
[02:51:58] graph so the event graph contains all
[02:52:00] the nodes and blueprints which makes up
[02:52:02] the programming or logic behind our
[02:52:05] third person character now if you don't
[02:52:07] see an event graph for example if it's
[02:52:09] closed then you can come into my
[02:52:11] Blueprints and double click on event
[02:52:13] graph to bring it back also we can move
[02:52:16] any of the windows just like in the
[02:52:18] level editor and change things to our
[02:52:20] liking now if you mess up the user
[02:52:22] interface to the point of no return then
[02:52:25] come up to window load layout and
[02:52:27] default editor layout to reset the
[02:52:29] windows to what unreal has by default we
[02:52:32] get an extra window under our event
[02:52:34] graph call compiler results I don't need
[02:52:36] this so I could click on the X icon or
[02:52:38] as a shortcut hover over the tab and
[02:52:41] press the middle Mouse button to close
[02:52:42] it so let's go over exactly what some of
[02:52:45] these blueprints do right here so if I
[02:52:47] zoom in for example on the jump input we
[02:52:51] can see exactly the logic that's behind
[02:52:54] jumping so the logic is pretty simple we
[02:52:56] have an event which is essentially at
[02:52:58] least in this case functions as a
[02:53:01] keyboard press so input action is jump
[02:53:03] right now it's set to the space bar so
[02:53:06] when I press a space bar our character
[02:53:08] jumps and when I release the space bar
[02:53:10] our character stops jumping and we can
[02:53:13] see this in action by clicking on the
[02:53:15] play
[02:53:16] button and pressing space now notice
[02:53:21] that I did spawn all the way over here
[02:53:24] and that's because we don't have a
[02:53:25] player start within our world so to add
[02:53:28] a player start come up to the add button
[02:53:30] go down to Basics and drag in a player
[02:53:33] start so here we have a new object in
[02:53:36] our world if I press play our player
[02:53:39] starts from this location and also
[02:53:41] points in the direction of the arrow so
[02:53:43] if I rotate this for example it's facing
[02:53:46] the rocks and press play now our player
[02:53:49] starts and spawns right there pointing
[02:53:51] at these rocks so if I jump back into
[02:53:54] bpor thir person character and player
[02:53:56] game we start from this location now I'm
[02:53:59] going to press shift and F1 at the exact
[02:54:01] same time to get back my mouse cursor
[02:54:04] and I'm going to move the window to the
[02:54:06] top right hand corner so we can see
[02:54:09] exactly what is happening so if I press
[02:54:11] space we don't see visually what is
[02:54:13] happening within our vent graph so to
[02:54:15] see the blueprints running in real time
[02:54:17] I can come up to no debug object
[02:54:19] selected and then select bpor thirr
[02:54:22] person character spawned now if I zoom
[02:54:25] out on my event graph notice how some of
[02:54:28] the wires turned from white to Orange
[02:54:30] these orange wires tell us that these
[02:54:32] nodes are currently being activated if I
[02:54:35] zoom back into input action jump and
[02:54:38] let's get back our character if I press
[02:54:40] the space bar we can see that I jump and
[02:54:42] then when I let go we stop jumping so
[02:54:44] jump and stop jumping so this is a great
[02:54:47] way to debug
[02:54:48] and watch our logic running in real time
[02:54:51] which is amazing and it really speeds up
[02:54:53] the process of programming in unreal so
[02:54:56] let's create our first sequence of nodes
[02:54:58] we're going to add in new functionality
[02:55:01] specifically I want to add in the
[02:55:03] ability where when I press the F key our
[02:55:05] character drops and it ragd dolls so we
[02:55:08] no longer have control over our mesh
[02:55:11] instead we let the physics take control
[02:55:13] and watch his body fall over similar to
[02:55:15] GTA or other games so to do so we first
[02:55:19] need to add in an event specifically to
[02:55:22] add in any node to our graph right click
[02:55:25] and we're able to type in the name of
[02:55:26] the node or manually scroll to that
[02:55:28] nodes location right here but obviously
[02:55:31] there are a lot of nodes since we're
[02:55:33] able to program an entire game through
[02:55:34] blueprints so something I like to do is
[02:55:37] type in the name I'm going to type in
[02:55:39] keyboard because it's under keyboard
[02:55:41] events and F since it's the F key and
[02:55:45] select it so now we get a new event that
[02:55:48] will be fired whenever I press the F key
[02:55:50] to double check that this event is
[02:55:51] working I'm going to add in another node
[02:55:54] by right clicking and typing in print
[02:55:57] streen so to hook up two nodes and
[02:55:59] connect them to each other hover over
[02:56:01] the output hold down the left Mouse
[02:56:03] button drag into the input and let go to
[02:56:07] connect them up to break hold down the
[02:56:09] ALT key and left Mouse button in either
[02:56:12] the output or the input so the controls
[02:56:16] are very similar to our material graph
[02:56:19] and now within print streen we see that
[02:56:21] the streen is going to be hello instead
[02:56:23] I want to say Advent was fired
[02:56:25] exclamation points and we can get more
[02:56:29] options for this node by clicking on the
[02:56:31] drop down at the bottom of the node and
[02:56:33] for text color instead of blue make this
[02:56:37] orange so now if I press the play button
[02:56:40] click into my window to start playing my
[02:56:42] game when I press the F key the event is
[02:56:45] fired and print stren is activated so
[02:56:48] when I press F then we get text onto my
[02:56:51] screen that says event was fired which
[02:56:53] is what we just programmed so I'm going
[02:56:55] to escape my game and delete print
[02:56:58] streen since that was just an example
[02:57:00] that I want to show which proves that my
[02:57:03] event right now is working so whenever I
[02:57:05] press the vent key all the nodes that
[02:57:07] are connected to press will be activated
[02:57:10] so specifically I want a new node now I
[02:57:13] could right click and type in the name
[02:57:14] of the node which is set Collision
[02:57:17] enabled
[02:57:19] mesh and then hook it up like that or as
[02:57:23] a shortcut I'm going to delete those and
[02:57:25] drag from pressed let go and it will
[02:57:28] automatically Breen up my notes now I
[02:57:31] can type in set Collision enabled select
[02:57:34] mesh and they will automatically be
[02:57:37] connected that's another way to breed in
[02:57:39] nodes and notice how this is two noes we
[02:57:42] have set Collision enabled and for
[02:57:44] Target we have mesh mesh is a reference
[02:57:48] to the mesh component of our blueprints
[02:57:50] so it's specifically referencing our
[02:57:52] character right there jump back into
[02:57:54] event graph and if it's for some reason
[02:57:57] not hooked up by default then I can drag
[02:58:00] mesh from the component's window into my
[02:58:02] vent graph let go and plug it up like
[02:58:05] that but I'm real smart enough to know
[02:58:08] that if we do want to set Collision
[02:58:09] enabled we probably want to do it to the
[02:58:11] skeletal mesh right here now for new
[02:58:14] type instead of no Collision select
[02:58:16] Collision enabled query and physic
[02:58:18] don't worry exactly what this node does
[02:58:21] I'm going to show what it does in just a
[02:58:23] moment now I want to connect another
[02:58:25] node from set Collision enabled which is
[02:58:28] sets simulates physics and specifically
[02:58:31] choose mesh which will automatically
[02:58:34] connect our mesh to this new node make
[02:58:37] sure set simul physics is turned on drag
[02:58:40] from here again and go set physics blend
[02:58:44] weight and then select mesh and for the
[02:58:48] blend weight change it from 0 to
[02:58:51] 1 so as you can probably guess these
[02:58:55] three nodes will essentially ragd dooll
[02:58:57] our character pressing play again I can
[02:59:00] run around my world and then as soon as
[02:59:03] I press the F key our character ragd
[02:59:06] dolls and the physics take control so
[02:59:09] let's do that again I can run around
[02:59:12] jump and press the F key to ragd
[02:59:15] doll we can better organize our Gra
[02:59:18] because notice that the target for all
[02:59:20] three of my nodes is mesh so we don't
[02:59:23] have to drag from an individual
[02:59:25] reference to mesh we only need one
[02:59:27] reference to mesh so I'm going to select
[02:59:29] these two delete them and drag out mesh
[02:59:33] into set Sim like physics and drag from
[02:59:36] the same one to set physics blend weight
[02:59:39] I can also better organize my graph by
[02:59:41] hovering over any wires and double
[02:59:44] clicking to add in a reroute node so
[02:59:47] simply hover over a wire double click to
[02:59:49] bring in a reroute node which doesn't
[02:59:51] change any of the logic it just helps
[02:59:53] better organize our graph and pull down
[02:59:57] alt so I'm going to break this
[02:59:59] connection and then drag from the
[03:00:01] reroute node into set physics blend
[03:00:03] weight hover over the wire double click
[03:00:06] and bring that down like that to just
[03:00:10] better organize my graph now I can watch
[03:00:13] all three of them be enabled by clicking
[03:00:15] the play button and let me go make my
[03:00:19] window just a little bit smaller make
[03:00:21] sure that bpor thir person character is
[03:00:24] selected as the debug option and when I
[03:00:26] press F we can see all three of those
[03:00:28] nodes are activated and it gives us this
[03:00:30] ragd doll effect okay so let's create a
[03:00:32] little obstacle course for our character
[03:00:35] jump back into game map and I want to
[03:00:36] create an elevated area where the
[03:00:38] obstacle course will be so press shift
[03:00:41] and two to go to landscape mode have
[03:00:43] sculpt selected and it's not that
[03:00:45] intense so bring tool strength up to
[03:00:49] one and I'm going to keep sculpting
[03:00:52] until I find a height that I like for
[03:00:54] example right here is pretty good go
[03:00:57] into the flatten brush then hover over
[03:01:00] the exact height that you want hold down
[03:01:02] the left Mouse button to flatten that so
[03:01:06] now I can create a little obstacle
[03:01:09] course
[03:01:10] area right here like
[03:01:14] that
[03:01:16] and I think the edges are too sharp so I
[03:01:20] can also go into smooth bring down the
[03:01:22] tool strength and
[03:01:25] slightly smooth out the area so maybe
[03:01:29] even a little bit less
[03:01:31] strong just so that we don't get any
[03:01:33] artifacts from those sharp
[03:01:38] angles
[03:01:40] and I
[03:01:43] could select my player start and drag it
[03:01:46] all the way up here here or I can delete
[03:01:50] it and let's add in a brand new one come
[03:01:52] up to add Basics player start drag it in
[03:01:56] and make sure it's pointing in the X
[03:01:58] Direction so now if I press play our
[03:02:01] player starts right here and they're
[03:02:03] going to have to navigate some obstacles
[03:02:06] until they get to the very end and they
[03:02:08] win the game so this is going to be the
[03:02:10] quickest and worst game made in history
[03:02:13] so let's create our obstacle and this
[03:02:15] obstacle is specifically going to be a
[03:02:18] blueprint so press control space and
[03:02:20] let's create the blueprint under third
[03:02:22] person blueprints right click and under
[03:02:25] create basic asset select blueprint and
[03:02:27] I want it to be an actor so this name is
[03:02:30] going to be
[03:02:31] bpor
[03:02:33] obstacle and you might be wondering why
[03:02:35] do I use BP uncore well BP stands for
[03:02:38] blueprint and it's just naming
[03:02:40] convention you could name this obstacle
[03:02:42] without the BP but I like to include it
[03:02:45] so double click to go inside of our
[03:02:46] blueprint and and this is what a
[03:02:48] completely empty blueprint looks like so
[03:02:51] let's actually add in a new component
[03:02:53] which will be our obstacle so come to
[03:02:55] add and down to here select cylinder I
[03:02:59] want to decrease its width just a little
[03:03:02] bit and also increase it a lot in the
[03:03:05] z-axis so I'm going to move this up so
[03:03:07] that the bottom is touching the grid
[03:03:09] floor and come back into game map let's
[03:03:12] go find where the obstacle is and drag
[03:03:14] it into our world also it's recommended
[03:03:16] that you do press compile which will set
[03:03:19] all the changes we made in the blueprint
[03:03:21] but all blueprints will automatically be
[03:03:23] compiled when we press play so come back
[03:03:25] into game map press play and here we
[03:03:28] have our first obstacle and I want it
[03:03:31] where when the player touches it he rack
[03:03:34] dolls and we essentially die so let's
[03:03:37] come back into our obstacle and I need
[03:03:39] to add in a collision volume so type in
[03:03:42] collision and it's going to be a capsule
[03:03:44] Collision so select that right there and
[03:03:47] and I'm going to scale up this Collision
[03:03:50] so let's scale it up and make sure that
[03:03:53] the Collision is larger than the
[03:03:56] cylinder because otherwise if the
[03:03:58] Collision is too small for example if
[03:04:00] it's smaller than the cylinder then our
[03:04:02] character will collide with the cylinder
[03:04:04] first and never collide with the actual
[03:04:06] Collision volume so make sure that is a
[03:04:09] little bit larger than it is and then in
[03:04:13] the details panel with Collision
[03:04:15] selected you want to select on on
[03:04:17] component begin overlap so this will be
[03:04:20] called whenever our Collision comes into
[03:04:23] contact with an object but right now
[03:04:26] this event will be fired whenever it
[03:04:28] comes into contact with anything so if
[03:04:30] it touches a plant or maybe if we have
[03:04:33] birds in a game it touches a bird then
[03:04:35] this event will be fired which is
[03:04:36] something that we don't want to happen
[03:04:38] so we can get around that by dragging
[03:04:40] from overlap other actor and doing cast
[03:04:44] to bpor third person character and
[03:04:48] select that so essentially what this
[03:04:50] casting is doing is that it's going to
[03:04:51] check if the overlapped object is the
[03:04:54] third person character and then if it is
[03:04:56] let's print string to double check that
[03:04:59] this is
[03:05:00] working and for the string say
[03:05:03] cided with
[03:05:06] character so let's jump back into the
[03:05:08] game map press play and now if I come up
[03:05:11] to it we see top leftand corner right
[03:05:14] here that we are colliding with the
[03:05:17] character which is something we want now
[03:05:20] I want it where when we do Collide our
[03:05:22] player ragd dolls and dies so jump back
[03:05:25] in a bpor obstacle let's delete that and
[03:05:29] casting also has the benefit that we get
[03:05:31] access to a lot of the properties that
[03:05:33] are within bpor thir person character so
[03:05:36] if we jump back into our character I
[03:05:38] want to create a custom event right here
[03:05:41] so this custom events will allow us to
[03:05:43] call all the nodes that we've already
[03:05:45] set up so right click type in custom
[03:05:48] event and call this one death just like
[03:05:52] that and drag it into the start so make
[03:05:56] sure you compile because otherwise you
[03:05:57] will not see it but if we jump into bpor
[03:06:00] obstacle and drag from our third person
[03:06:02] character we now get access to the death
[03:06:05] event so select it we can now control
[03:06:08] when our player dies from another
[03:06:10] blueprint which isn't our third person
[03:06:12] character F was just being used as a
[03:06:14] debug event I'm going to delete it
[03:06:17] because all we need is the death
[03:06:19] function so if I press play now if the
[03:06:22] player now collides with the obstacle we
[03:06:25] see that as soon as they touch it our
[03:06:26] player dies so let's go do that again
[03:06:29] come to the obstacle touch it and he
[03:06:31] dies so what's happening right now is
[03:06:33] that M bpor obstacle as soon as the
[03:06:36] object touches the capsule Collision
[03:06:38] it's going to check if that object is a
[03:06:39] third person character if it is a third
[03:06:42] person character then we're going to
[03:06:43] call the custom event called Death
[03:06:45] double click on the event to jump to
[03:06:47] where being created which is in our
[03:06:48] third person character and all these
[03:06:50] nodes raged all our character right now
[03:06:53] our obstacle isn't much of an obstacle
[03:06:55] by press play it's very easy to avoid
[03:06:58] this pillar since this pillar isn't
[03:07:00] moving now we can make this a little bit
[03:07:02] harder by adding rotation to the pillar
[03:07:04] so let's jump back into bpor obstacle
[03:07:07] and I'm going to specifically use the
[03:07:09] event tick Now by default every new
[03:07:12] blueprint does include an event tick
[03:07:14] right here but in case you deleted the
[03:07:16] default events you can always get back
[03:07:18] the event tick by right clicking and
[03:07:20] typing in event tick and selecting it so
[03:07:23] the event tick is pretty unique compared
[03:07:25] to other events in that it runs every
[03:07:28] single frame so we can see this running
[03:07:30] in action by adding in a print stren and
[03:07:33] for the streen call this one activated
[03:07:36] so now if I press play we can see that
[03:07:39] every single frame activated is being
[03:07:41] called so let's go delete
[03:07:44] that and I want to use the node called
[03:07:47] add
[03:07:48] actor local rotation and select it right
[03:07:51] there so plug it up like this and we're
[03:07:54] not going to notice anything happening
[03:07:56] since we need to add a new local
[03:07:57] rotation and I specifically want to
[03:08:00] increase let's go to the x-axis 5° so
[03:08:04] now if I press play we see that every
[03:08:06] single frame my obstacle is rotating
[03:08:09] 5° and while this is great there's one
[03:08:12] issue and that is it's frame dependent
[03:08:15] so right now we're running at probably a
[03:08:17] smooth 120 frames per second but what if
[03:08:20] this game was running on a computer
[03:08:21] that's not as powerful and it's running
[03:08:24] every 30 frames per second well we can
[03:08:26] see what it's like to simulate that by
[03:08:29] pressing the backtick key to bring up
[03:08:31] the command line and type in t. Max FPS
[03:08:35] and type in 30 to lock it to 30 frames
[03:08:37] per second it's still rotating 5° every
[03:08:41] frame but we have less frames so it's
[03:08:44] going to be rotating slower so we need
[03:08:46] to make this Frame frame independent I
[03:08:49] can bring back my original frame rate by
[03:08:51] clicking on the back tick key again
[03:08:53] typing in t. maxfps and put in zero to
[03:08:58] uncap the frame rate and to do so we
[03:09:00] need to use the Delta seconds so I'm
[03:09:02] going to drag from Delta rotation and
[03:09:06] type in make Rotator down here so select
[03:09:10] that and essentially the make Rotator
[03:09:12] will break our rotation so we get access
[03:09:15] to X Y and Z independent as inputs so
[03:09:19] I'm going to drag from Delta seconds and
[03:09:22] type in multiply like that and select it
[03:09:26] so now the output will go into the
[03:09:29] X and for rotation we're going to set it
[03:09:32] back to five so if I press play again
[03:09:35] and now we're going pretty slow so I'm
[03:09:37] going to increase this from 5 to 100
[03:09:40] press play
[03:09:41] again and our obstacle is rotating I can
[03:09:45] lock this frame rate by clicking on the
[03:09:46] back tick key
[03:09:48] and type in t. maxfps let's lock it to
[03:09:51] 30 and notice that despite it being 30
[03:09:53] seconds we are still rotating at the
[03:09:56] same exact speed as beforehand I can
[03:09:58] even try t. maxfps 120 frames per second
[03:10:02] and we have the same speed so our game
[03:10:04] play is no longer tied to our frame rate
[03:10:06] which is exactly what we
[03:10:08] want right now all we have is one
[03:10:11] obstacle blueprint in our world if I
[03:10:13] want multiple of them I can select this
[03:10:15] blueprint and hold on all to duplicate
[03:10:17] it or I can drag it out from our content
[03:10:20] drawer now if I press play we do have
[03:10:23] the issue and that is they're rotating
[03:10:25] in the exact same direction I can rotate
[03:10:28] each of these blueprints in a random
[03:10:31] Direction on the
[03:10:32] z-axis to give our rotations a little
[03:10:35] bit of variety now if I press play We're
[03:10:39] rotating in different directions but
[03:10:41] it's pretty hard to tell exactly what
[03:10:43] direction it's going to be rotating on
[03:10:45] when editing our game in viewports to
[03:10:47] help us know the direction that we're
[03:10:49] rotating jump back into bpor obstacle
[03:10:52] let's go to viewport and click on ADD
[03:10:55] and we're going to add in an arrow
[03:10:56] component so this Arrow component and I
[03:10:59] can zoom in to see exactly what it is it
[03:11:01] will not be visible when we're playing
[03:11:02] our game which is exactly what we want
[03:11:05] so for Arrow color I'm going to set this
[03:11:07] to Blue and also rotate this let's go
[03:11:12] 90° in the z-axis and lift this up so
[03:11:17] but now if I compile jump back into game
[03:11:19] map we can see that I have a blue arrow
[03:11:22] that's poed in the direction that my
[03:11:25] obstacle will rotate so pressing play
[03:11:27] I'm able to tell exactly where this
[03:11:29] object will rotate to now that I do have
[03:11:32] some obstacles there's just one issue
[03:11:35] and that is they're all going the same
[03:11:37] exact speed I want some obstacles to be
[03:11:40] slower than others so I want to be able
[03:11:42] to edit that property in the details
[03:11:44] panel of the blueprints so to do so I
[03:11:46] need a to make a variable and variables
[03:11:49] are pretty similar to a material's
[03:11:51] parameters so let's jump back into event
[03:11:53] graph and under variables I can create a
[03:11:56] new one by clicking on the plus icon so
[03:12:00] call this one
[03:12:02] rotation speed and instead of Boolean I
[03:12:05] can change it up here to a float so a
[03:12:09] float is a number with decimal points
[03:12:12] now I got to hold down the left Mouse
[03:12:13] button and drag out rotation speed let
[03:12:16] go inside of my vent graph and it's
[03:12:18] going to ask me whether I want to get it
[03:12:20] or set it I want to get the rotation
[03:12:22] speed and plug it up right there so
[03:12:25] instead of 100 we're going to be using
[03:12:27] whatever value is stored within rotation
[03:12:30] speed so you can essentially think of
[03:12:32] variables as containers of data now when
[03:12:35] we do have rotation speed selected we're
[03:12:37] unable to change that value because our
[03:12:39] blueprint needs to be compiled so as
[03:12:42] soon as I press compile I now get access
[03:12:44] to that value it's set at zero so if I
[03:12:47] do play my game we aren't rotating now I
[03:12:50] can bring this back to
[03:12:52] 100 and if I play my game we have the
[03:12:55] same exact speed but that's not the
[03:12:58] point of variables variables are great
[03:13:00] because they allow us to change the
[03:13:01] default value so I want to expose this
[03:13:04] variable that's how I'm able to edit it
[03:13:06] within the details panel of my object
[03:13:09] make sure that you have rotation
[03:13:10] selected and in the details panel check
[03:13:13] instance edible and expose on spawn now
[03:13:17] now if I press compile jump back into
[03:13:18] game map we can see that when I do have
[03:13:21] an obstacle blueprint selected rotation
[03:13:23] speed is made available so I can make
[03:13:26] this obstacle right here have a speed of
[03:13:28] 50 this one a speed of 200 and right
[03:13:32] there let's go 300 now if I press play
[03:13:36] they all have different speeds so it
[03:13:39] makes it a lot harder to try and
[03:13:42] navigate this obstacle course we are
[03:13:45] right now missing a very crucial element
[03:13:46] to game and that is an end goal so the
[03:13:50] goal that I want the player to try to
[03:13:52] reach is specifically under starter
[03:13:55] content props smore statue so the player
[03:13:59] is trying to make it to the Statue and
[03:14:02] I'm going to change the material from
[03:14:03] glass to Gold so starter content
[03:14:06] materials and drag metal gold onto the
[03:14:10] glass like
[03:14:11] that now when the player and I'm aware
[03:14:15] that you can just walk around the
[03:14:16] obstacle of course I want to add in the
[03:14:19] feature where when the player is by the
[03:14:20] statue we get a wind screen telling us
[03:14:22] that we did beat the game to begin let's
[03:14:25] add in a trigger volume which will
[03:14:26] trigger whenever the player is near the
[03:14:28] statue so to do so come up to add and
[03:14:31] under volumes select the trigger volume
[03:14:33] so I'm going to drag it out and place it
[03:14:36] so that it's around the statue we want
[03:14:39] to program it where whenever the player
[03:14:40] collides with this trigger volume then a
[03:14:43] wind screen will pop up we're going to
[03:14:44] program this logic through the level
[03:14:46] blueprints so every level in a real
[03:14:48] engine has its very own blueprint where
[03:14:51] we're able to script logic that is very
[03:14:53] specific to the level so to open up your
[03:14:56] level blueprint come up to the blueprint
[03:14:58] icon right here select that and then
[03:15:00] select open level blueprints now this is
[03:15:03] the event graph that is specific for
[03:15:04] game map we can even see that the name
[03:15:07] of this blueprint is game map which is
[03:15:09] different from BP uncore obstacle or our
[03:15:12] third person character since it's not an
[03:15:15] individual object instead it's the level
[03:15:17] as a whole now I'm going to delete our
[03:15:20] default custom events and I want to make
[03:15:22] sure that in my level editor I have the
[03:15:25] trigger volume selected so with it
[03:15:28] selected I'm able to get a bunch of
[03:15:30] different properties and events that are
[03:15:32] related to the trigger volume for
[03:15:34] example if I right click we can see that
[03:15:37] add event for trigger volume 3 and under
[03:15:39] Collision we get the event that I want
[03:15:41] which is add on actor begin overlap if
[03:15:44] you do not see any of these options then
[03:15:47] you want to make sure that you do have
[03:15:48] your trigger volume selected in the map
[03:15:51] so right click add event for trigger
[03:15:53] volume collisions and add on actor begin
[03:15:56] overlap which is essentially a very
[03:15:58] similar event to our on component begin
[03:16:02] overlap so we want to do the exact same
[03:16:04] thing we did right here and that is make
[03:16:07] sure that we are overlapping with the
[03:16:09] third person character so drag from
[03:16:11] other actor and cast to third person
[03:16:15] character and select it right there now
[03:16:18] I want to make sure that this event is
[03:16:20] working by dragging from this node and
[03:16:23] printing string so the sentence that I
[03:16:26] want to come up is you won the game
[03:16:30] exclamation point so ideally pressing
[03:16:33] play I'm going to walk around my
[03:16:36] obstacle course we will fix that in a
[03:16:39] bit and as soon as I come into contact
[03:16:41] with the trigger volume we see in top
[03:16:43] left hand corner we get the stream you
[03:16:45] won the game now let's create a wind
[03:16:47] screen so to create a user interface
[03:16:50] let's press control and space and I'm
[03:16:52] going to create it under third person
[03:16:54] blueprints right click under user
[03:16:56] interface select widget so user
[03:16:59] interfaces in a real are called widgets
[03:17:02] and I'm going to select user widget
[03:17:03] under common now it's going to ask me to
[03:17:06] name this widget I'm going to call this
[03:17:08] one win screen
[03:17:11] widget and then double click to go
[03:17:13] inside of it so this will be very brief
[03:17:16] it's not a proper introduction to the
[03:17:18] widget editor since all I want is a
[03:17:20] little bit of text that will come up
[03:17:22] once we do beat the game so to begin in
[03:17:24] the pallet I'm going to type in canvas
[03:17:27] and drag in canvas into my graph let go
[03:17:30] the green outline is essentially our
[03:17:33] window now I'm going to type in text and
[03:17:36] drag in text into my graph so I want to
[03:17:39] Center my text that's out it's in the
[03:17:40] middle of my screen and then in the
[03:17:43] details panel let's go change the text
[03:17:46] to you won the game exclamation point
[03:17:50] also under appearance click on the font
[03:17:53] drop down and increase the size so the
[03:17:56] text is very noticeable I'm actually
[03:17:58] going to decrease it just a little bit
[03:18:01] more and I want to move this flower icon
[03:18:05] into the middle of the screen that's how
[03:18:07] my text is anchored so my text will
[03:18:09] always be in the middle of the screen no
[03:18:11] matter the size of my window so press
[03:18:13] compile and let's save everything now
[03:18:16] jump back into a game map and I'm going
[03:18:18] to delete this print streen since now we
[03:18:21] have a proper wind screen track from
[03:18:24] here and create a widget of course the
[03:18:27] widget we're going to create is the one
[03:18:28] that we just made so windscreen
[03:18:31] widget and drag from here and then add
[03:18:33] to viewport since by default it will be
[03:18:37] hidden we need to show it so now if I
[03:18:41] play my game go around my obstal
[03:18:45] course and I collide with the Collision
[03:18:48] of my statue we see that I just won the
[03:18:51] game and congratulations you just made
[03:18:54] your first video game in onreal engine 5
[03:18:56] while it's not the best hopefully you
[03:18:58] did learn the very Basics to programming
[03:19:01] using blueprints real quickly let's fix
[03:19:03] the game so our player can't run around
[03:19:05] the obstacle course so press shift two
[03:19:08] to go back into landscape eding mode
[03:19:10] select flatten and flatten it out
[03:19:14] so the player only has one direction or
[03:19:17] one way to go to get to the
[03:19:21] Statue and
[03:19:23] also select all the obstacles hold down
[03:19:28] alt and I'm going to rotate them around
[03:19:31] and move them like this so there are
[03:19:33] multiple objects the player has to dodge
[03:19:36] and I'm going to delete one of the
[03:19:37] obstacles in the middle to make our game
[03:19:39] a little bit
[03:19:40] easier and move the player start since
[03:19:43] every Press Play I just get dropped from
[03:19:45] the play Space move the player start so
[03:19:48] it's resting on top of the landscape
[03:19:50] press
[03:19:51] play and now the goal is to try to make
[03:19:54] it past all the obstacles and not get
[03:19:58] hit and at the very end we see you won
[03:20:01] the game when I get to the
[03:20:02] Statue now at this point we have all the
[03:20:05] knowledge needed to create this
[03:20:07] beautiful castle environment you see
[03:20:09] right here in this last chapter I will
[03:20:12] walk through the entire process we will
[03:20:15] start off by sculpting and painting the
[03:20:16] landscape and then we will move on to
[03:20:19] crean the castle using modular assets
[03:20:21] finally we'll paint trees and foliage
[03:20:24] and at the end add a third person
[03:20:26] character to our world so the player can
[03:20:28] walk around our finished environment
[03:20:30] while you can follow this tutorial
[03:20:32] exactly I highly encourage you to
[03:20:34] experiment and create your own unique
[03:20:36] environment use this video as a
[03:20:38] reference and Veer off the path to make
[03:20:41] this world your own since after all you
[03:20:43] are not creating my environments you're
[03:20:45] creating your own one one but before we
[03:20:47] can do that a quick word from our
[03:20:50] sponsor just kidding we don't have a
[03:20:52] sponsor but if you do want to support
[03:20:53] the channel then you can check out the
[03:20:55] unreal masterclass the masterclass is an
[03:20:58] expanding collection of exclusive
[03:21:00] tutorials and lessons for Unreal Engine
[03:21:02] 5 in it we take an even deeper dive into
[03:21:05] unreal going over animation
[03:21:08] architectural visualization Advanced
[03:21:10] blueprints how to create a game
[03:21:12] completely from scratch and much more
[03:21:16] another way to support this channel is
[03:21:17] by subscribing and sharing this video
[03:21:20] because I have a lot more free tutorials
[03:21:22] and assets planned for the future so
[03:21:25] with all that being said let's create
[03:21:27] our Castle okay before we get started of
[03:21:29] course we need to create a brand new
[03:21:31] project since I want to show the process
[03:21:33] completely from scratch which means we
[03:21:35] start off with a new project so double
[03:21:38] click to open up on real engine and in
[03:21:40] the project browser let's select games
[03:21:43] and for a template I'm going to select
[03:21:46] third person
[03:21:47] so third person will have a bunch of
[03:21:48] assets already loaded up in our project
[03:21:50] the reason why is because I want to use
[03:21:52] the mannequin right here as a human
[03:21:54] reference to help us with scale and to
[03:21:56] make sure that our environment isn't too
[03:21:58] big or too small now for project
[03:22:00] location that's correct I just want to
[03:22:02] save this onto my desktop and for the
[03:22:05] name let's call this one Castle
[03:22:08] environment now I don't need the starter
[03:22:11] content and I don't need rate tracing so
[03:22:13] let's press create the reason why is
[03:22:15] because we already have some content
[03:22:17] we're going to use in these starter
[03:22:19] assets we downloaded so if you haven't
[03:22:21] downloaded the assets already there's a
[03:22:22] link in the description below this is
[03:22:24] what you will see in a brand new project
[03:22:26] with a third person template down here
[03:22:28] it says new plugins are available we can
[03:22:30] dismiss that and select update so this
[03:22:33] is a very simple map if I press play We
[03:22:36] automatically spawn in as our character
[03:22:40] reminder to move around it's the W ASD
[03:22:42] keys and you can press space to jump so
[03:22:46] pretty simple now I don't want to use
[03:22:49] the third person template map right here
[03:22:51] I want to create a new map completely
[03:22:53] from scratch so we're not going to go to
[03:22:55] file and select new level and then use a
[03:22:58] template instead I'm going to create a
[03:23:00] map through the content browser so right
[03:23:03] click on content and create a brand new
[03:23:05] folder call this folder maps and within
[03:23:10] here right click new level and this one
[03:23:13] will be as you can probably guess Castle
[03:23:16] in environment so double click to go
[03:23:18] inside of here and now we're inside a
[03:23:20] completely blank unreal level so before
[03:23:23] we do anything let's create a landscape
[03:23:26] come up to select landscape and it's
[03:23:29] going to automatically use the new tool
[03:23:32] I'm going to keep everything as default
[03:23:35] and press create now we can't see the
[03:23:38] landscape because we need to add in a
[03:23:39] directional light go lights directional
[03:23:42] light drag it
[03:23:45] in and and now we need a sky so let's go
[03:23:48] to visual effects sky and atmosphere
[03:23:50] drag that
[03:23:51] in and add in a cube so let's add in a
[03:23:55] cube right there and I think right now
[03:23:58] is a good time to bring in a human
[03:23:59] reference I like to bring in a human
[03:24:01] reference as soon as possible to make
[03:24:03] sure everything is scaled correctly so
[03:24:06] go into characters
[03:24:08] mannequins meshes and we can drag in any
[03:24:11] of these I'm going to drag
[03:24:13] inmore Manny for our human reference
[03:24:16] now if we zoom in on the Shadows
[03:24:19] obviously we need a little bit of a
[03:24:21] bluish tint from our sky and that is
[03:24:23] where the Skylight will come in so
[03:24:25] hopefully by now if you have watched the
[03:24:27] tutorial then you are pretty familiar
[03:24:30] with this lighting setup so select the
[03:24:32] Skylight and because we're using a sky
[03:24:35] and atmosphere I want the Skylight to
[03:24:37] have real-time capture turn on and set
[03:24:39] to movable and have our directional
[03:24:41] light also be set to movable and
[03:24:44] congratulations you are B basically done
[03:24:47] with the lighting and outdoor scene
[03:24:49] there is one last step we can do and
[03:24:50] that is to get rid of this black void
[03:24:53] that's in the bottom half of my world
[03:24:55] we're going to hide that by adding in
[03:24:58] exponential High fog like
[03:25:02] that so Lighting in a real engine has
[03:25:05] pretty much never been easier another
[03:25:07] thing I'm going to do to prevent my
[03:25:09] camera from getting brighter and darker
[03:25:12] is to of course add in a post-process
[03:25:14] volume so go to volumes postprocess
[03:25:17] volume add that in go to exposure and
[03:25:21] we're going to set that to manual it's
[03:25:23] not making effect right now because if I
[03:25:26] go into my postprocess volume it affects
[03:25:28] my camera but if I go out it doesn't so
[03:25:31] I need to make sure that my postprocess
[03:25:33] volume has infinite extent Unbound
[03:25:35] turned on and with exposure compensation
[03:25:39] bring this up from 1 to 11 or we can
[03:25:44] even leave it at 10. five for now but we
[03:25:47] will be changing the exposure
[03:25:49] compensation throughout the rest of this
[03:25:51] video since I think it's very helpful to
[03:25:54] see what our world looks like using
[03:25:55] different postprocess settings and one
[03:25:58] last thing we could do that I personally
[03:26:00] like to add to all my worlds but it's
[03:26:01] entirely up to you is to add in clouds
[03:26:05] so come to add visual effects and drag
[03:26:07] in volumetric clouds just like that and
[03:26:10] at this point we are pretty much done
[03:26:11] with the lighting portion I'd say about
[03:26:13] 80% of outdoor scenes are simp L lit
[03:26:16] this way so you have your sunlight
[03:26:19] Skylight and exponential height fog of
[03:26:22] course you need your Skylight that's how
[03:26:24] we get our blue sky and maybe optionally
[03:26:29] we get clouds so with all that you're
[03:26:32] able to quickly light an outdoor scene
[03:26:34] very easily and a post-process volume
[03:26:37] which we will be controlling our
[03:26:38] exposure compensation now as a reminder
[03:26:41] you can move the directional light by
[03:26:44] clicking on it and rotating around round
[03:26:46] or as a shortcut you can hold down
[03:26:48] control and L to rotate it that way so
[03:26:52] by no means is the lighting of our world
[03:26:53] final we're going to continually jump
[03:26:55] back to these actors and change their
[03:26:57] properties to see what settings and
[03:26:58] options look
[03:27:00] nice I think it's time now to handle the
[03:27:03] landscape since obviously Landscapes
[03:27:05] won't look like this there'll be grass
[03:27:08] dirt Cliffs and so on so we can get a
[03:27:11] nice landscape material I've already
[03:27:12] created from the downloadable asset pack
[03:27:16] so let's move this to the side and here
[03:27:19] is the downloadable content so make sure
[03:27:21] you do download this because you will
[03:27:23] need the assets to follow along with the
[03:27:24] rest of the tutorial so double click to
[03:27:27] open it up go intro unreal 5 and it's
[03:27:31] the castle assets so I'm going to drag
[03:27:33] it onto my desktop to unzip it this
[03:27:37] folder is an unreal project that
[03:27:39] contains all the assets I want to use so
[03:27:41] of course we need to migrate those
[03:27:42] assets into my main project so let's
[03:27:45] open up Castle asset and here we have
[03:27:48] some assets we're going to use to create
[03:27:50] our castles so of course we have all of
[03:27:54] our Castle static meshes we even have
[03:27:56] some Mountain meshes that we're going to
[03:27:58] place in the background but we're not
[03:28:00] going to go over these static meshes
[03:28:01] just yet since what I want to use is the
[03:28:05] landscape material so jump into Castle
[03:28:07] assets Landscapes and it's mcore
[03:28:10] landscape instance so let's migrate all
[03:28:14] these assets into to our main project so
[03:28:18] press control space and right click on
[03:28:21] Castle assets select
[03:28:24] migrate and make sure everything is
[03:28:27] selected so everything's looking correct
[03:28:29] and then select okay now it's going to
[03:28:32] ask for a destination folder we can find
[03:28:34] the destination folder by manually going
[03:28:37] to our desktop and into our projects
[03:28:39] content folder or I can press control
[03:28:41] space in our main project right click on
[03:28:43] content go to show and explore
[03:28:46] and then copy the location of the
[03:28:48] content folder and paste its location
[03:28:52] right there like that and select it so
[03:28:55] all these assets have been copied over
[03:28:57] to Castle environment now we no longer
[03:29:00] need this project I can exit out and in
[03:29:03] Castle assets we have everything so jump
[03:29:05] into Maps
[03:29:07] overview and here was that exact map we
[03:29:10] were just on but now it's in our main
[03:29:12] project also whenever we exit out of our
[03:29:15] project and open it back up I want let's
[03:29:18] go into Maps our main environment right
[03:29:22] here Castle environment to be the map
[03:29:24] that's opened so to help us save time so
[03:29:26] we don't always have to navigate to
[03:29:28] Castle environment to open it up I can
[03:29:30] go to Project
[03:29:31] settings and within maps and modes under
[03:29:35] editor startup map select Castle
[03:29:38] environment so now whenever we open up
[03:29:39] our project our main map will be the one
[03:29:42] that's opened so let's jump back into
[03:29:44] Castle environment
[03:29:47] and add mcore landscape instance to our
[03:29:51] landscape now I can't just drag it onto
[03:29:53] our landscape instead I'm going to
[03:29:55] select the landscape and make sure
[03:29:57] landscape material slot is visible right
[03:29:59] there and then drag mcore landscape
[03:30:02] instance onto it like that now our
[03:30:05] landscape is completely black but that's
[03:30:08] expected jump into landscape mode and
[03:30:11] select paint and I want to assign Auto
[03:30:14] material to my entire landscape AP so
[03:30:17] click on the plus icon and select weight
[03:30:19] Blended layer normal now it's going to
[03:30:21] create a landscape layer we can save it
[03:30:24] at the default folder that they have
[03:30:26] click save and save everything so now we
[03:30:30] have grass on our landscape and what's
[03:30:32] neat about this material is that if we
[03:30:35] start
[03:30:37] sculpting we can see that as I sculpt
[03:30:40] our materials naturally transition so we
[03:30:43] go from Grass at the top to lift at very
[03:30:46] sharp angles and then back to grass so
[03:30:49] it just adds an extra layer of realism
[03:30:52] this material is very similar to the
[03:30:54] auto material that you can see on my
[03:30:56] channel I have an entire video that
[03:30:58] takes a deep dive into all the settings
[03:31:00] of this material but really quickly I'm
[03:31:02] going to go over them that's how you
[03:31:04] know exactly how to use this material so
[03:31:07] let's go open up this material instance
[03:31:10] and we can see that we have just a bunch
[03:31:13] of different settings so I'm going to
[03:31:15] undock lock the details panel to make it
[03:31:17] easier for us and move it off to the
[03:31:20] right side now to begin you'll notice
[03:31:23] that a lot of these parameters are
[03:31:25] actually repeating that's because each
[03:31:27] of these different materials so Dore
[03:31:30] material c b and a all share basically
[03:31:34] the exact same parameters which control
[03:31:36] the look of specific layers so a
[03:31:38] material is a grass layer B is the cliff
[03:31:42] C is mud and D is basically dry soil
[03:31:47] which we're going to use as a trail and
[03:31:50] E is something customizable where if you
[03:31:52] really want let's say snow then you
[03:31:55] could go into bridge and then plug those
[03:31:57] textures up right here we're not just
[03:31:59] limited to the auto material we can
[03:32:02] manually paint in grass or Cliff
[03:32:04] wherever we want so jumping back to
[03:32:06] landscape mode paint let's say maybe I
[03:32:10] don't want a cliff right here then I
[03:32:13] could paint in grass so let me create
[03:32:15] weight Blended layer normals for all the
[03:32:18] material layers right
[03:32:21] here up to D says we don't need e and no
[03:32:25] height map and then select a so I can
[03:32:28] paint away the
[03:32:30] cliff right there Then manually tell
[03:32:35] unreal where I want my
[03:32:38] cliff and grass textures I can also go
[03:32:42] in with mud and we're going to use this
[03:32:44] when we add water
[03:32:46] into my landscape in just a bit also we
[03:32:50] have material D which we're going to use
[03:32:53] as a trail so again this material is
[03:32:57] insanely customizable so if you don't
[03:33:00] like these textures or you want a new
[03:33:02] material then you can go in and edit
[03:33:04] them so let's begin with what albo
[03:33:07] controls do so albo controls function
[03:33:10] the exact same way that they do for our
[03:33:12] quickel Bridge assets so we can boost
[03:33:14] the saturation up and make the landscape
[03:33:17] grass really
[03:33:19] saturated or we can boost the brightness
[03:33:23] or decrease the brightness right there
[03:33:25] we can also increase and decrease the
[03:33:29] contrast of the texture below that is
[03:33:31] tint is just to give a different colored
[03:33:34] overlay so if I want to make my grass a
[03:33:38] little bit reddish I can add the tint
[03:33:41] right
[03:33:41] there and then we have normal strength
[03:33:45] of course this controls the normal map
[03:33:47] so let me find a good
[03:33:48] angle increase it have a much more
[03:33:51] intense normals so there's more depth
[03:33:54] and
[03:33:54] shadows or decrease it and we have no
[03:33:58] Shadows so I'm just going to leave it at
[03:34:01] its default of one that roughness as you
[03:34:04] can guess controls how rough the
[03:34:07] landscape is and then spec strength
[03:34:09] controls the specularity now generally I
[03:34:12] like to keep this really low because if
[03:34:15] we do have have a very specular
[03:34:16] landscape for example let's make this
[03:34:20] three then our landscape looks more like
[03:34:22] plastic than something you would stand
[03:34:24] on so we'll leave that at
[03:34:28] 0.1 and then we have distance blending
[03:34:32] so right now maybe you can see it but
[03:34:35] when we're up close to the landscape we
[03:34:37] have a certain entirely amount so this
[03:34:39] is what the size looks like when the
[03:34:40] camera's up close to it but if we go
[03:34:43] away then we transition to a a lot less
[03:34:46] tiling where the texture size is a lot
[03:34:48] larger so zooming in we get smaller and
[03:34:51] far aways a lot larger that is just one
[03:34:54] method we're going to use to hide the
[03:34:55] texture
[03:34:57] repetition and we can turn it on and off
[03:34:59] right here so here is what it looks like
[03:35:01] with distance blending turned on and
[03:35:03] then here's what it looks like without
[03:35:05] distance blending so this is with and
[03:35:09] without so distance blending is a great
[03:35:11] way to hide texture repetition and we
[03:35:14] have mask so mask if I turn that on
[03:35:18] basically switches out our texture right
[03:35:20] here so if I have this unchecked then
[03:35:22] we're using a roughness or if I want to
[03:35:24] use a mass texture then I'm going to
[03:35:26] select it right there but since all my
[03:35:28] textures are just using roughness I'm
[03:35:30] going to have that unchecked and then we
[03:35:32] have size and size far so size far as
[03:35:36] you can guess controls the tiling for
[03:35:39] the far away map and size a controls the
[03:35:43] ti Lane for something up close like
[03:35:46] right here and we have start offset and
[03:35:49] blend falloff which control where the
[03:35:52] distance blending starts so maybe you
[03:35:54] want the distance BL to start a lot
[03:35:56] closer up to the camera then we can
[03:35:59] change start offset from
[03:36:01] 3,800 to 380 CM so now it's a lot closer
[03:36:07] but I'm going to leave that where it's
[03:36:09] pretty far away and these same
[03:36:12] parameters function exactly alike for
[03:36:15] the rest of my material so B material C
[03:36:17] material and D material although B
[03:36:19] material does have something a little
[03:36:21] bit different and that is down here we
[03:36:22] have bore material
[03:36:25] tripler so here's what I'm going to do
[03:36:28] I'm going to create a very steep slope
[03:36:32] go to flatten increase the brush right
[03:36:35] there and create a steep slope also
[03:36:39] maybe add just a little bit of smoothing
[03:36:41] to smooth out I'm going to press alt and
[03:36:44] three to go into unlit mode and here is
[03:36:47] what our Cliff looks like with tripler
[03:36:50] and here's what it looks like without
[03:36:51] tripler so especially right here our
[03:36:54] texture is very stretched but then if we
[03:36:57] add tripler then the texture is fixed
[03:36:59] and it looks normal so that's why we're
[03:37:01] using tripler on B material because odds
[03:37:03] are it's this material right here that's
[03:37:06] going to be on really sharp edges since
[03:37:09] it's the cliff material so hopefully
[03:37:11] with all that knowledge you're able to
[03:37:13] control and create your landscape
[03:37:15] exactly the way that you want again on
[03:37:17] my channel there's an entire video that
[03:37:19] takes a deeper dive into all these
[03:37:20] settings so I'm going to exit out of my
[03:37:23] material instance and paint our first
[03:37:26] pass on our landscape so the way I
[03:37:29] recommend that you create environments
[03:37:31] is that you first handle the really
[03:37:33] large detail first for example your
[03:37:35] Landscapes and your mountains and then
[03:37:37] once you get the correct form down then
[03:37:39] you can move on to your medium detail
[03:37:42] which is the trees and the castle and
[03:37:44] finally when you like how look move down
[03:37:46] to the really really small detail like
[03:37:49] your grass Pebbles and shrubs that's the
[03:37:52] best way to create large vironments and
[03:37:53] unreal cuz let's say for example you
[03:37:56] spend a lot of time sculpting a mountain
[03:37:59] and then you also spend a lot of time
[03:38:00] adding meshes trees houses to that
[03:38:03] mountain but then you decide that you
[03:38:05] don't like the fundamental way that the
[03:38:06] mountain looks then you're going to have
[03:38:08] to go all the way back to the beginning
[03:38:10] which is sculpting it so it's best to
[03:38:12] make sure that you like your environment
[03:38:14] before adding in small detail details so
[03:38:17] let's go to sculpt and increase the
[03:38:19] brush size with the right bracket key
[03:38:20] until it's pretty large and what I'm
[03:38:23] going to do is go around the perimeter
[03:38:25] of my
[03:38:26] landscape and then just add in random
[03:38:29] Hills so some perimeters like
[03:38:32] this
[03:38:35] Hills and this is a reminder you're not
[03:38:38] limited to the current size of your
[03:38:39] landscape so if you want to increase the
[03:38:42] size then go to manage and select add
[03:38:45] now I can click or hold down the left
[03:38:47] Mouse button to add on new components to
[03:38:51] make my landscape even bigger before we
[03:38:54] continue sculpting our landscape it's
[03:38:56] very essential that we first go over
[03:38:57] bookmarks because when creating our
[03:38:59] environments I recommend that you have
[03:39:02] one central location so one point that
[03:39:04] you're always referencing back to to
[03:39:07] look at your environment that's how
[03:39:08] you're able to keep track of all the
[03:39:09] changes you made and this is basically
[03:39:11] going to be our main cinematic
[03:39:13] shot so I think right here is a good
[03:39:16] spot for our main shot or main camera
[03:39:20] location but now there's an issue that
[03:39:23] is whenever I do make an edit I have to
[03:39:25] fly all the way over there and then try
[03:39:27] to eyeball where my camera was
[03:39:29] originally and this is where bookmarks
[03:39:31] come in really handy so first you want
[03:39:33] to find a spot that you like then come
[03:39:36] up here and click on the three line
[03:39:38] button and all the way down here under
[03:39:40] bookmarks go to set bookmark and I'm
[03:39:43] going to set this as bookmark one also
[03:39:45] the shortcut is wherever you are in your
[03:39:48] environment press contrl and one now I
[03:39:52] can fly around anywhere and then press
[03:39:56] the one key on my keyboard to snap to
[03:39:59] that original location so that's control
[03:40:01] and one to set a bookmark and then it's
[03:40:03] one to snap to that bookmark location
[03:40:06] and we're not just limited to one
[03:40:08] bookmark we have 10 different bookmarks
[03:40:11] so for example I could do control 2
[03:40:13] right here and all the way over here I
[03:40:15] have control and three so now one 2 and
[03:40:19] three keys will then snap to the
[03:40:21] different bookmark locations and if I
[03:40:23] ever want to override a bookmark for
[03:40:25] example I don't like the angle or the
[03:40:28] location up two then I can find a new
[03:40:30] location press control 2 and now we have
[03:40:33] the new bookmark so let's click on one
[03:40:37] and this is going to be my main shot
[03:40:39] right here so press control and one to
[03:40:41] set that bookmark so what I want to do
[03:40:44] is jump back in landscape sculpt and on
[03:40:47] the right side of my main cinematic shot
[03:40:52] I want a really tall mountain which will
[03:40:55] essentially be where our main Castle is
[03:40:57] located and then to the left of that
[03:41:00] will be a little bit smaller
[03:41:02] Hillside where some castle ruins will be
[03:41:06] located so go to
[03:41:09] flatten and decrease the
[03:41:13] brush size move this out then going to
[03:41:18] smooth and smooth all of this out so
[03:41:21] same thing right here going to
[03:41:25] flatten this entire
[03:41:27] location and make this
[03:41:30] Terrace just a little bit
[03:41:33] taller
[03:41:35] also give it a sharper slope with the
[03:41:38] flat in and that's too sharp so then
[03:41:41] smooth it out with a smooth brush
[03:41:45] so the vast majority of sculpting in a
[03:41:47] real engine is alternating between the
[03:41:50] sculpt
[03:41:51] brush smooth brush and the flatten brush
[03:41:56] so that's pretty much all we're going to
[03:41:59] be doing when sculpting it Onre so let's
[03:42:01] press one again and I'm actually going
[03:42:03] to angle
[03:42:04] it let's go right here and press control
[03:42:07] and one so behind me I'm also going to
[03:42:12] elevate right here
[03:42:18] and I'm going to get rid of this example
[03:42:20] sculpt so go to flatten brush and
[03:42:22] flatten all of that
[03:42:24] out also go into paint Auto
[03:42:28] material and paint over those paint
[03:42:33] layers because I was just using that as
[03:42:35] an example so I want several
[03:42:39] hillsides so we have one layer of hills
[03:42:42] in the
[03:42:43] back and then another another layer of
[03:42:46] Hills all the way back
[03:42:49] here to just add depth to my
[03:42:53] environment that's how our environment
[03:42:55] looks like it's a lot larger than just
[03:42:58] right here and another thing I'm going
[03:43:00] to do is to handle the really really
[03:43:02] large details is to go into Castle
[03:43:06] assets
[03:43:09] meshes and drag out these meshes right
[03:43:12] here which are our mountains
[03:43:15] so by
[03:43:17] default I think the mountains are way
[03:43:20] too large so in the details panel I'm
[03:43:23] going to decrease it by
[03:43:25] 0.5 so I need to type 0.5 in x 0.5 in y
[03:43:30] and then 0.5 again in z or a shortcut
[03:43:34] I'm going to press control Z to undo all
[03:43:36] that is to select this lock icon so now
[03:43:40] whenever I make a change in the X Y or
[03:43:42] z-axis the change is going to be shared
[03:43:45] between them so now if I press 0.5 they
[03:43:47] all get 0.5 so that's a nice
[03:43:50] shortcut let's go
[03:43:53] move all of them right here bring this
[03:43:58] down and try to
[03:44:01] find some good
[03:44:03] angles for these meshes so these are
[03:44:07] just background meshes of course the
[03:44:08] player would probably never be on top of
[03:44:10] the
[03:44:11] mountains it's just a good way to add
[03:44:16] scale to the environment without
[03:44:18] actually creating an entirely new
[03:44:20] landscape and then going through and
[03:44:22] having to sculpt that landscape keep in
[03:44:24] mind that at some points when creating
[03:44:26] this environment I'll speed up the video
[03:44:29] because honestly there will be a lot of
[03:44:31] repetition since the majority of create
[03:44:33] environment is just sculpting the
[03:44:35] landscape painting foliage and moving
[03:44:38] objects
[03:44:39] around and notice how I'm continually
[03:44:41] pressing one and jumping back to my main
[03:44:43] shot to see how the mount mountainscape
[03:44:45] looks and I
[03:44:48] think hold on alt again move that right
[03:44:51] there and I think our mountains are
[03:44:53] looking pretty nice and now it's also a
[03:44:56] good time to change some of the settings
[03:44:58] on the exponential height fog since I
[03:45:00] think our world is a little bit too
[03:45:02] foggy to begin with so if you remember
[03:45:06] I'm going to select the exponential
[03:45:08] height fog if you can't find where it is
[03:45:09] in our world then within the outliner
[03:45:12] type in exponential and then it will
[03:45:15] show up right here if I grab the
[03:45:18] exponential High fog and move it up we
[03:45:20] move the fog up or if I move it down it
[03:45:22] goes down so we're able to control where
[03:45:24] the fog starts by playing with that
[03:45:28] object and for fog height fall off and
[03:45:33] increase that to
[03:45:35] 0.3 fog
[03:45:37] density also slightly decrease
[03:45:40] that and move that
[03:45:43] down I don't like the angle of my sun so
[03:45:46] hold down contrl and L and rotate it
[03:45:50] that's how the Shadows are coming across
[03:45:51] the screen so we're going from left to
[03:45:54] right like
[03:45:58] here and another thing I notic is that
[03:46:00] it's pretty hard to see how big this
[03:46:03] hill is so I'm going to add a character
[03:46:08] to make sure this scale is correct so
[03:46:10] skm Manny and this is way too small I
[03:46:14] thought it was a lot bigger so jump into
[03:46:18] landscape mode again sculpt this up a
[03:46:21] little
[03:46:23] bit and I think we're almost there
[03:46:27] flatten it give it a Sharper
[03:46:30] Edge decrease the brush and also flatten
[03:46:34] it over
[03:46:36] here let's see what our main shot looks
[03:46:39] like and I'm going to change the angle a
[03:46:41] little bit also bring down my camera
[03:46:44] speed
[03:46:45] that's us more up and press control and
[03:46:48] one so I think this looks good for now
[03:46:52] now let's create a lake so we're going
[03:46:54] to create a little bit of a lake right
[03:46:56] here and a river that goes in between
[03:46:59] these two Hills that make a little
[03:47:00] Valley so going to sculpt and hold down
[03:47:04] shift to decrease this space right
[03:47:08] here so we carve out an
[03:47:13] area for our
[03:47:15] Lake right there and I'm actually going
[03:47:19] to flatten out this entire area over
[03:47:21] here
[03:47:23] too going to
[03:47:25] smooth smooth all that out and now for
[03:47:29] this
[03:47:30] location let's add in the Water by going
[03:47:33] to Castle assets meshes and it is smore
[03:47:37] water plane so simply drag that out and
[03:47:41] increase the size to get get a lake so
[03:47:46] very simple to get water now I know that
[03:47:49] unre of 5 technically does have water
[03:47:51] built in but as of this unreel enged
[03:47:54] version which is the first version of u5
[03:47:57] the official water plugin is in beta and
[03:48:00] it is pretty glitchy so instead we're
[03:48:03] going to use the traditional way of
[03:48:05] creating water and that is with a simple
[03:48:07] flat plane that's using a water
[03:48:11] material also if you don't like the way
[03:48:13] the water looks you can open up its
[03:48:15] material instance and change some of the
[03:48:18] settings so I'm going to undock the
[03:48:20] details panel that's so I can briefly go
[03:48:22] over what some of these parameters do so
[03:48:24] first off of course we have deep water
[03:48:27] and Shore color so Shore color is going
[03:48:30] to change the color of the
[03:48:32] shore and then deep water is going to
[03:48:35] change in the main color so maybe you
[03:48:38] want two different colors for the shore
[03:48:41] and the deep water right here we have
[03:48:43] opacity and this controls how opaque the
[03:48:47] water is so it notice how when I do
[03:48:49] decrease
[03:48:51] it our water is much more
[03:48:54] faint and
[03:48:57] then notice how we have a little bit of
[03:48:59] Ripples and these ripples are being
[03:49:01] driven by the normal map that's right
[03:49:03] here so maybe you don't like the ripples
[03:49:05] you want to get rid of them then you
[03:49:07] could go into Ripple normal intensity
[03:49:09] and bring that from 0.5 to zero so now
[03:49:13] we have perfectly still water but I do
[03:49:15] like a little bit of ripples in there so
[03:49:18] I'm going to leave it at 0.5 we can also
[03:49:20] control how large the ripples are with
[03:49:23] ripple tiles so right now it's set to
[03:49:25] 900 set to 100 for really really small
[03:49:28] ripples or set that to something even
[03:49:32] larger for basically waves but I think
[03:49:36] the value that I lefted right here is
[03:49:38] pretty good we can even control how
[03:49:40] chaotic the ripples are since right now
[03:49:42] they're pretty slow I want them to be
[03:49:44] slow because I want this thing to be
[03:49:45] pretty peaceful but you can increase the
[03:49:48] speed to one now it is very fast
[03:49:52] personally I'm not going to change
[03:49:54] anything because I like the settings as
[03:49:55] they are right now so just know that you
[03:49:57] do have the options to change the way
[03:49:59] your water looks if you don't like it we
[03:50:02] need to make some edits to our landscape
[03:50:04] right now because our water isn't making
[03:50:06] that much sense our grass is growing
[03:50:09] underneath the water when it should be
[03:50:10] muddy let's go into landscape paint and
[03:50:14] finally use the mud layer right there so
[03:50:18] where there's water I'm going to paint
[03:50:20] in
[03:50:22] mud to help the transition in between
[03:50:25] the grass and the water also use the
[03:50:29] flatten brush and
[03:50:31] sculpt
[03:50:33] decrease my brush size with the left
[03:50:35] bracket
[03:50:36] key and I'm going to paint a river in
[03:50:40] between the two hills so hold on the
[03:50:43] left Mouse button
[03:50:45] and paint it like
[03:50:46] that the plane isn't big enough so let's
[03:50:50] increase that
[03:50:52] size and also go into landscape
[03:50:56] mode increase the size of my brush
[03:50:59] that's so I can
[03:51:00] make the lake
[03:51:02] bigger and even longer like
[03:51:07] that let's make room for the lake over
[03:51:12] here smooth it out
[03:51:18] decrease the brush size of the flatten
[03:51:22] brush and create another River we have a
[03:51:25] river going into a lake and then it
[03:51:29] continues down that
[03:51:31] way so increase that
[03:51:37] size and then move it all out right here
[03:51:42] on the sides
[03:51:44] at this point I'm fast foring just a
[03:51:46] little bit since all I'm doing is
[03:51:48] sculpting and painting layers so I'm
[03:51:51] making sure that I'm painting mud
[03:51:52] wherever there's water and I'm also
[03:51:55] smoothing out the shoreline so there
[03:51:57] isn't as harsh of a transition in
[03:52:00] between the water and the landscape I'm
[03:52:03] also moving this hill a little further
[03:52:06] back to make more room for the
[03:52:08] valley and smoothing out my Hills so we
[03:52:11] don't have as sharp of a 90° angle on
[03:52:13] the landscapes and to keep everything
[03:52:16] smooth and since we have made a lot of
[03:52:18] progress maybe in the future I might
[03:52:21] make a really large change and I don't
[03:52:22] like that change so I want to come back
[03:52:24] to this state of our level something I
[03:52:27] like to do with my environments is press
[03:52:29] control and space let's go find out
[03:52:31] where this map is here we have our map
[03:52:34] Castle environment same map that we
[03:52:36] currently have open up here Castle
[03:52:37] environment let's save
[03:52:40] everything and then select Castle
[03:52:42] environment press crl C and control V V
[03:52:45] to duplicate that and I'm going to call
[03:52:48] this one
[03:52:49] Castle backup1 so whenever I make large
[03:52:52] changes I like to duplicate the map I'm
[03:52:54] currently editing just to create a
[03:52:57] backup in case I make some really big
[03:53:00] error I can always go back to a previous
[03:53:03] version of this level so so far I like
[03:53:06] my large details the landscape looks
[03:53:09] good for now and the mountains look
[03:53:11] great so does the river but there is one
[03:53:13] last large detail we need to add and
[03:53:16] that is some mini mountains or some more
[03:53:19] Hills that's how the transition in
[03:53:21] between the sculpted landscape and the
[03:53:23] mountain isn't as harsh since there is
[03:53:26] no mesh in between our main space and
[03:53:30] the background
[03:53:31] mountains so we're going to do this with
[03:53:34] a very specific Mega scan asset that I
[03:53:37] like so let's come to add quick Bridge
[03:53:40] there's only one asset I want to
[03:53:41] download right now and that's under 3D
[03:53:43] assets and and type in
[03:53:47] Icelandic
[03:53:48] volcano and click enter so it's
[03:53:53] specifically this one right here so
[03:53:55] icelantic volcano terrain and this is
[03:53:58] one of my favorite meshes because I
[03:53:59] think it's very versatile since it's
[03:54:01] huge it's large it can be used as
[03:54:04] mountains Hills just large Terrain in
[03:54:07] general it adds a lot of detail to the
[03:54:10] background so we could download medium
[03:54:12] quality but since this mesh is going to
[03:54:15] be very large I'm going to download this
[03:54:17] as nanite quality so do keep in mind
[03:54:20] that if you are going to download this
[03:54:21] as nanit the textures are going to be
[03:54:23] akk and there will be a lot of polyes so
[03:54:26] it's going to take up a lot of space in
[03:54:27] your project but since it's already
[03:54:29] downloaded for me I must select the add
[03:54:33] button and now this mesh if I double
[03:54:36] click on it to open it
[03:54:38] up here we have the icelantic volcano
[03:54:42] terrain so let's exit out of both of
[03:54:45] these press control and space go into
[03:54:48] Mega scans 3D assets volcano terrain and
[03:54:53] drag it out now I'm going to scale it up
[03:54:57] that's how it's pretty large and move it
[03:55:00] off to the side so let me go scale this
[03:55:03] up even
[03:55:04] again and move
[03:55:06] it that's how it's somewhere like right
[03:55:10] there just like that and maybe even
[03:55:12] scale it down
[03:55:16] so let me copy and paste multiple of
[03:55:18] these just with different
[03:55:21] sizes within the middle right
[03:55:24] here so that we have even more
[03:55:27] background meshes to help blend in
[03:55:30] between our landscape and
[03:55:33] mountains so this is why I really like
[03:55:36] this mesh is because there's so much
[03:55:38] detail on it that you're able to copy
[03:55:40] and paste it multiple
[03:55:43] times and and use it just like how I am
[03:55:46] using it right
[03:55:51] here
[03:55:53] also I think it's a little bit too dark
[03:55:56] so let's open up the material instance
[03:55:59] right here grab the details panel and
[03:56:03] for albo
[03:56:05] tint make
[03:56:08] it a little bit more
[03:56:11] green that's how it Blends in with the
[03:56:13] landscape cape and then
[03:56:19] increase the saturation just a little
[03:56:22] bit and right here is the time lapse for
[03:56:26] the finishing touches of our large
[03:56:27] detail so this is everything I did
[03:56:30] before we moved on to the medium detail
[03:56:32] which will be our trees and the actual
[03:56:34] castle all I'm doing right now is
[03:56:36] copying and pasting moving the same
[03:56:39] assets we've been using which are the
[03:56:40] mountains and the volcanic terrain
[03:56:43] around my entire landscape that's how
[03:56:45] from all angles we are surrounded by
[03:56:48] mountains so it really feels like that
[03:56:51] our Castle is in the middle of the Alps
[03:56:53] or somewhere mountainous like that now
[03:56:56] that I'm done with the mountains I'm
[03:56:58] going through my landscape and adding
[03:57:00] some finishing touches just trying to
[03:57:02] make my landscape flow a lot more
[03:57:04] natural by going through with the smooth
[03:57:06] brush and removing a lot of the sharp
[03:57:09] edges don't forget to compare your
[03:57:10] landscape to the human reference since
[03:57:12] we don't have any buildings or trees to
[03:57:15] give us a visual representation of the
[03:57:17] size of our sculpts right now I'm adding
[03:57:19] more Hills and variation just to
[03:57:22] randomize my terrain and make it more
[03:57:24] realistic also just because we're done
[03:57:27] with the large detail doesn't mean we're
[03:57:29] done sculpting if you do want to make a
[03:57:31] change and this is great about on real
[03:57:32] engine even if you added a bunch of
[03:57:34] meshes you can still sculpt your terrain
[03:57:37] again and just move the meshes around to
[03:57:39] make sure that they're on top of the
[03:57:40] terrain so just because we're done with
[03:57:42] large details does doesn't mean we're
[03:57:44] done sculpting now it's on to the medium
[03:57:47] to large detail specifically Cliff
[03:57:50] meshes because right now our Cliffs look
[03:57:53] pretty plain it's just a little bit of a
[03:57:56] slope with a plain texture that's
[03:57:59] repeating so it's not very visually
[03:58:02] pleasing and it doesn't really feel like
[03:58:03] Cliffs and we can fix this by replacing
[03:58:06] the landscape with static meshes so
[03:58:08] we're going to Overlay static meshes
[03:58:10] which will represent our Cliffs to do so
[03:58:13] of of course you could probably guess
[03:58:15] where we're going to get these meshes
[03:58:17] and that is quickel Bridge static meshes
[03:58:20] I want to use are called Nordic Cliff so
[03:58:25] press enter and it's these really large
[03:58:27] ones all the way down here so these
[03:58:30] meshes we're going to use to represent
[03:58:33] our Cliffs now I've already gone ahead
[03:58:36] and I favor did a lot of the meshes
[03:58:38] right here so just go through find some
[03:58:41] of the static meshes that you like
[03:58:43] download them and import them now it's
[03:58:46] important to know that I decided to
[03:58:48] download all these static meshes at high
[03:58:50] quality which is not nanite quality so
[03:58:53] it doesn't have the detail of nanite
[03:58:55] it's also in 4k and not in 8k the reason
[03:58:59] why I decided to use high quality is
[03:59:01] simply put memory space because if we
[03:59:05] were to use nanite then very quickly
[03:59:08] your project can balloon to over 50 GB
[03:59:11] large and I just want to keep my project
[03:59:13] pretty lightweight
[03:59:14] but if you do want the best quality
[03:59:16] possible and that is nanite then nothing
[03:59:19] stopping you from using nanite except
[03:59:21] memory space so I've already gone ahead
[03:59:24] and I downloaded a lot of these objects
[03:59:27] I'm just going to go through and add all
[03:59:31] the large Cliff meshes so we're not
[03:59:34] adding foliage and small rocks just yet
[03:59:39] I'm only adding the very large Cliffs to
[03:59:43] my project
[03:59:45] and now that I've added all of these
[03:59:48] Cliffs we can see that we have a lot of
[03:59:50] new folders under Mega scans 3D assets
[03:59:54] as a reminder if you want to filter for
[03:59:57] a specific object or asset type within a
[04:00:01] folder structure you want to select the
[04:00:03] folder and click on this button right
[04:00:06] here and let's filter for static meshes
[04:00:10] so we can see all the meshes we're about
[04:00:13] to use I'm going to exit Bridge whenever
[04:00:16] I download a lot of assets I like to fly
[04:00:19] off to the side of my world and drag
[04:00:21] them out just so I see exactly what
[04:00:23] meshes we have access to so go to Mega
[04:00:25] scans 3D assets and let's filter for the
[04:00:27] static meshes to see all of them and
[04:00:30] drag them out into my world so we have
[04:00:33] this really large one I'm going to move
[04:00:35] to the side and scale down that's a
[04:00:37] little bit too large and we have a bunch
[04:00:41] of other lift static meshes
[04:00:45] now just because these aren't nanite
[04:00:47] meshes doesn't mean we can't use nanit
[04:00:49] and I recommend for your majority meshes
[04:00:51] if you are able to use nanite use nanite
[04:00:54] since it gives us more detail and it's
[04:00:56] just much more performant than using
[04:00:58] traditional levels of detail so select
[04:01:01] all of them right click and let's enable
[04:01:04] nanite like that and press contrl s to
[04:01:07] save so now that I see all the different
[04:01:09] meshes I have what I'm going to do is
[04:01:13] Select the large ones hold down alt and
[04:01:17] duplicate them over here to start
[04:01:20] placing them on my Cliff so we have this
[04:01:23] one right here that I can scale
[04:01:25] up
[04:01:27] and simply place it that's how it's
[04:01:30] hovering over the cliff like that
[04:01:33] essentially what I'm doing right now is
[04:01:35] that I'm combining all the different
[04:01:37] Cliff meshes that's how it makes it look
[04:01:39] like they're all one Cliff mesh and that
[04:01:41] it's part of the landscape do keep in
[04:01:43] mind mind that when I'm placing my
[04:01:45] static meshes we want to look out for
[04:01:47] the bottoms of the static meshes for
[04:01:49] example right here since when they did
[04:01:51] scan in these objects it took a little
[04:01:53] bit of the bottom with them so for
[04:01:56] example right here we can see that the
[04:01:58] bottom of the static mesh which is the
[04:02:00] mesh's ground floor is showing so I can
[04:02:03] hide
[04:02:04] that by just increasing the elevation of
[04:02:08] the
[04:02:09] landscape a little bit like that and
[04:02:13] also to hide the ground floor for this
[04:02:16] mesh I can scale it in the Y AIS a
[04:02:19] little
[04:02:20] bit and position the mesh that's so the
[04:02:23] cliff that's at the bottom is covering
[04:02:25] the static mesh's
[04:02:27] holes fortunately the bottom Cliff mesh
[04:02:29] isn't big enough to cover the holes
[04:02:31] here's an example of what I mean
[04:02:32] obviously this is very unnatural Cliffs
[04:02:34] don't do this in real life so this is
[04:02:37] why we downloaded The Boulders over here
[04:02:39] so hold on alt and let's duplicate all
[04:02:42] them move them over to my Cliff
[04:02:47] area and with the boulder
[04:02:50] selected I can smash them into the wall
[04:02:54] right
[04:02:56] here to hide the holes in my
[04:03:00] Cliff now I'm repeating the exact same
[04:03:03] process but for the rest of the cliff so
[04:03:07] wherever there's a slope I'm going to
[04:03:09] add the static mesh to that area also
[04:03:11] keep in mind that because all our meshes
[04:03:13] or nanite we pretty much have infinite
[04:03:16] detail so that means you can copy and
[04:03:18] paste as many of these clips as you want
[04:03:20] without having to worry about
[04:03:22] performance also of course the landscape
[04:03:25] isn't perfectly deforming to the static
[04:03:27] meshes so we have to go into landscape
[04:03:30] editing
[04:03:31] mode and make some adjustments
[04:03:33] specifically I'm going to make heavy use
[04:03:35] of the flatten brush just to flatten the
[04:03:38] landscape area so the landscape isn't
[04:03:40] going above the cliffs since I want
[04:03:42] there to be cliffs and then flat
[04:03:44] landscape after that now I'm going to do
[04:03:47] the same exact process but for the
[04:03:49] smaller Cliffs to the left of my River
[04:03:52] so copy and paste some of the static
[04:03:55] meshes we've already added to our world
[04:03:58] and place them onto the smaller ones now
[04:04:01] do keep in mind that I'm not going over
[04:04:03] the entire Cliff specifically the back
[04:04:06] area I'm only filling in the areas that
[04:04:08] are seen in my main shot if you want you
[04:04:11] can also add Cliffs to the back of the
[04:04:13] Hills but to save time I'm only going to
[04:04:15] be detailing the areas that we see we're
[04:04:19] really not doing anything new at this
[04:04:20] point again the vast majority of
[04:04:23] environment creation is just copying and
[04:04:25] pasting meshes around and since these
[04:04:27] meshes are already pretty randomized and
[04:04:30] natural there isn't anything too
[04:04:32] technical about this process I'm just
[04:04:34] moving objects around I toally think
[04:04:35] they're in a good position I think the
[04:04:38] landscape transitions in between the
[04:04:40] cliff objects like right here and the
[04:04:43] grass is way too jarring if we have a
[04:04:46] character then he just comes up to this
[04:04:48] location and then immediately goes from
[04:04:50] grass to Cliff so not very realistic we
[04:04:53] can hide this
[04:04:54] transition by manually adding in and
[04:04:58] painting in the cliff
[04:04:59] material so I'm going to go around my
[04:05:03] Cliff areas and paint in the cliff layer
[04:05:06] where our Mega scam assets meet the
[04:05:08] grass to just give it a more natural
[04:05:10] transition so it's not as
[04:05:12] noticeable Al as a reminder when
[04:05:14] painting a layer you can hold down shift
[04:05:17] to remove that
[04:05:18] layer okay great I would say at this
[04:05:21] point we are pretty much done to the
[04:05:23] medium to large details now it's time to
[04:05:25] move on to the medium details which is
[04:05:27] our trees and the actual castle
[04:05:29] environment and castle ruins so this is
[04:05:32] going to be pretty fun but before we
[04:05:34] make any changes let's make sure to save
[04:05:37] our world because we've done a lot of
[04:05:39] work so far and it'd be a shame if we
[04:05:41] lost our progress and let's also make a
[04:05:43] a backup of Castle environment so crl c
[04:05:46] contrl v and let's call this one
[04:05:51] Castle backup O2 and in case you don't
[04:05:56] know to rename Assets in unreal right
[04:05:59] click and select rename or you can press
[04:06:02] fn2 on the keyboard as a shortcut so
[04:06:05] let's make sure that we're editing
[04:06:07] Castle environment and we are up here or
[04:06:09] I can double click on it to make sure
[04:06:11] that I am inside of the level
[04:06:14] now there are three ways that we're
[04:06:16] going to get assets for this build so
[04:06:18] number one we're getting assets from
[04:06:21] quickel bridge number two we got them
[04:06:23] from the downloadable content that was
[04:06:25] already created for us and number three
[04:06:28] we're going to get free assets from the
[04:06:30] epic games Marketplace so make sure you
[04:06:33] have the epic games launcher pulled up
[04:06:35] and the specific product I want is the
[04:06:39] Mega scans trees so type that in and
[04:06:42] it's Mega scans tree European black now
[04:06:46] currently it's an early access so there
[04:06:47] might be some changes in the future also
[04:06:50] in the future these trees are going to
[04:06:52] be added to quickel bridge so you don't
[04:06:55] have to go through the epic games
[04:06:56] launcher in order to get them but let's
[04:06:59] go add to
[04:07:00] project and make sure show all projects
[04:07:03] is selected because the trees right now
[04:07:06] aren't created for ue5 so we need to
[04:07:09] download the ue4 versions so make sure
[04:07:12] show all project is selected to see my
[04:07:14] unreal ofi products and then find our
[04:07:19] project we just call Castle environment
[04:07:21] select it and it says asset not
[04:07:23] compatible with version 5 that's fine
[04:07:26] for the version select
[04:07:28] 4.27 and then add to project wait for it
[04:07:31] to download and be added to your project
[04:07:34] and we have one more asset pack I want
[04:07:35] to download from the marketplace because
[04:07:37] you'll notice that while these trees are
[04:07:39] great it doesn't come with pine trees so
[04:07:42] type in interactive Spruce
[04:07:46] forest and it is specifically this one
[04:07:49] right here so add to project show all
[04:07:53] projects let's find Castle environment
[04:07:56] select that and then add we can verify
[04:07:59] that those assets have been added to our
[04:08:01] project by opening up the content
[04:08:03] browser now we have a new folder called
[04:08:05] Black aler and another new folder called
[04:08:08] pnor interactive Spruce Forest so that
[04:08:11] tells me everything has successfully
[04:08:12] been download loaded now just like what
[04:08:15] we did with our Cliffs I want to drag
[04:08:17] out all the meshes I'm going to use into
[04:08:19] my project so let's come over
[04:08:22] here and let's first go over how to use
[04:08:27] the mega scans trees under the black
[04:08:29] Alder folder jump into geometry and
[04:08:32] there are two different versions of each
[04:08:33] tree you have pivot painer and then you
[04:08:35] have simple win I recommend we're going
[04:08:37] with simple win since it's a lot more
[04:08:39] performant and let's select everything
[04:08:43] and then drag it out to into my world
[04:08:46] and
[04:08:47] organize everything so we can see what
[04:08:49] assets we have available to us I'm also
[04:08:52] going to drag out a human reference to
[04:08:54] get a good sense of how large and Tall
[04:08:55] the trees are now let's go over some of
[04:08:58] the properties of Mega scan trees so you
[04:09:01] notice that as I zoom in we get more
[04:09:03] detail and as I zoom away we get less
[04:09:05] and less detail until it's just a flat
[04:09:08] plane geometry very little detail and
[04:09:10] that's because of level of detail now
[04:09:13] Norm
[04:09:13] I would recommend we don't use level
[04:09:15] detail I recommend we use nanites but
[04:09:17] unfortunately as of this version of
[04:09:19] Unreal Engine 5 which is the first
[04:09:20] version nanite does not support trees
[04:09:23] and foliage but if you are watching in
[04:09:25] the future then congratulations nanite
[04:09:28] probably supports trees I would go
[04:09:30] through all of my trees right click and
[04:09:33] then enable nanite but since it doesn't
[04:09:35] work right now I'm not going to do that
[04:09:37] now we can view all my level of details
[04:09:40] by opening up its static mesh editor and
[04:09:43] right here for lods we have LOD zero
[04:09:46] which is the most dense this tree can be
[04:09:49] then we have one which is less dense
[04:09:51] three less
[04:09:53] four five which barely has any leaves
[04:09:57] and finally six which looks pretty bad
[04:10:00] up close but when you're far away it's
[04:10:03] kind of hard to tell that's just a flat
[04:10:05] plane or real geometry so if you're
[04:10:07] watching the future congratulations you
[04:10:09] don't have to worry about these lods if
[04:10:11] you make your tree nanite now what if
[04:10:13] you don't care about performance and you
[04:10:15] want to turn off lods well you can do so
[04:10:19] by coming down here into the console
[04:10:20] commands and type in in r. Force LOD and
[04:10:24] to select the most dense L Type zero so
[04:10:28] that will force all the static meshes in
[04:10:30] your world to use the most dense LED
[04:10:32] which is zero so even if we're far away
[04:10:35] it's still going to use the really dense
[04:10:37] mesh but I wouldn't recommend doing so
[04:10:39] since if you do have thousands of trees
[04:10:41] in your world then your frame rate will
[04:10:43] dramatically drop now if you want to
[04:10:46] bring back
[04:10:47] lods and console commands instead of
[04:10:50] typing r. Force LOD Z or one type in
[04:10:55] negative 1 to bring back the default L
[04:10:58] switching just like that also if you do
[04:11:01] add your trees in through the folage
[04:11:04] mode then the console command is going
[04:11:05] to be a little bit different so r. Force
[04:11:07] LOD doesn't work for meshes painted with
[04:11:09] a Fage mode instead you want to use Fage
[04:11:12] do Force LOD so folage Force L is the
[04:11:15] same thing as r. Force L except for
[04:11:19] folage
[04:11:20] meshes so now that we gotten that out of
[04:11:22] the way let's go over how we can control
[04:11:24] the look and the wind speed of our trees
[04:11:28] and we can do so by jumping into MMS
[04:11:31] presets and going all the way over here
[04:11:34] to msor foolish material going to the
[04:11:37] folder called Global Fage actor and drag
[04:11:40] this in so this actor right here and all
[04:11:43] of its settings control all the mega
[04:11:45] scans trees and if I press play right
[04:11:49] now we will get a bunch of
[04:11:51] errors and that's because there is no
[04:11:54] directional light set right here so
[04:11:56] within the drop down you want to select
[04:11:58] directional light which is the light we
[04:12:00] created all the way at the beginning of
[04:12:02] this chapter now if I press play we
[04:12:04] don't get any errors so right here
[04:12:07] within the details panel over global
[04:12:09] full eor we get a bunch of different
[04:12:11] options so right here we can control
[04:12:14] wind we want to increase the strength
[04:12:16] right now it's two I can set this a 10
[04:12:19] and now our trees are very windy and
[04:12:22] you'll probably notice an issue and that
[04:12:24] is if I zoom in on the trees let's say
[04:12:27] right
[04:12:28] here there's a lot of motion blurring
[04:12:31] going on and that's a glitch with the
[04:12:32] current version of u5 so you might not
[04:12:35] have this but if you are using the first
[04:12:37] version of unre 5 to fix this weird
[04:12:40] motion bluring glitching select the tree
[04:12:44] and then for Mobility set it to movable
[04:12:47] and that'll get rid of it and now we can
[04:12:49] view our tree like normal so I'm going
[04:12:51] to select all the
[04:12:53] trees and select movable for Mobility to
[04:12:57] get rid of that issue so that's one
[04:12:59] glitch you need to be aware of and then
[04:13:01] if I select my full eor again go down to
[04:13:04] season strength I'm able to control what
[04:13:06] season our trees are using and this wind
[04:13:09] strength is pretty annoying so I'm going
[04:13:11] to set it back to two as its default so
[04:13:14] if I raise season strength we get more
[04:13:17] and more orange and yellow until we get
[04:13:20] a fall color so I'm going to leave it at
[04:13:23] a value of 500 or 800 for now now we
[04:13:28] have season brightness and season
[04:13:30] saturation I think the color is a little
[04:13:33] bit too Brown I want it to be really
[04:13:35] saturated that's how it feels like we're
[04:13:37] in a fantasy world so bring up the
[04:13:40] brightness and the saturation right
[04:13:42] there like this until you find a value
[04:13:46] that you like and we can always jump
[04:13:49] back into the F actor to make any edits
[04:13:51] if we don't like the edits we already
[04:13:53] have so do keep in mind that we don't
[04:13:55] edit a material instance although you
[04:13:57] can if you want precise controls for
[04:13:59] your mega scan trees instead you're
[04:14:01] going to use this Fage actor right here
[04:14:04] which is located in Ms presets Fage
[04:14:06] material and Global Fage actor so simply
[04:14:09] drag one out into your world and that
[04:14:11] will control all your trees
[04:14:13] all right so that's how you control Mega
[04:14:15] scan assets now let's go over how we
[04:14:17] control the spruce Forest specifically
[04:14:20] the pine trees so pine trees are located
[04:14:23] in pnor interactive Spruce Forest jump
[04:14:27] into there and then go into meshes and
[04:14:30] we need a filter for static meshes so we
[04:14:32] can see all the static meshes we have
[04:14:34] available to ourselves so I'm going to
[04:14:36] select all the really large ones at
[04:14:38] first but you notice that some of these
[04:14:39] meshes are duplicated again so I'm hold
[04:14:42] on control and select all the large
[04:14:44] meshes without underscore low so select
[04:14:48] these right here skip over all those and
[04:14:50] then drag it out like this unfortunately
[04:14:54] for us there's a glitch on some of these
[04:14:55] meshes level of details we'll see that
[04:14:57] when I zoom out there's a completely
[04:15:00] different material on their level
[04:15:02] details so that is wrong now the way we
[04:15:06] fix this is to entirely delete that
[04:15:08] level of detail so I'm going to select
[04:15:11] this mesh right here and I could press
[04:15:13] contrl b double click on it to open up
[04:15:15] the static mesh editor or press crl and
[04:15:17] e as a shortcut so let's go through all
[04:15:20] my lods l0 looks good L1 good two good
[04:15:27] three and we are completely using the
[04:15:30] wrong material so I'm going to remove
[04:15:32] lod3 from its LOD stack by making sure
[04:15:35] lod3 is selected right here and under
[04:15:39] ld3 select remove just like that so now
[04:15:43] now all we have is zero 1 2 and three
[04:15:46] and we don't get that wrong one so let's
[04:15:48] do the same thing right here press
[04:15:50] contrl and E and this one's also
[04:15:52] L3 and then select remove L now what I'm
[04:15:56] doing is going through the rest of the
[04:15:57] meshes and making sure they don't have
[04:15:59] that issue in the future we probably
[04:16:02] won't have these issues since nanite
[04:16:04] will support Fage so if you are watching
[04:16:06] in the future conratulations you don't
[04:16:07] have to go through this process you just
[04:16:10] have to enable Nite on the pine trees
[04:16:12] all right right one more change if you
[04:16:14] come up to any Fage with wind you'll see
[04:16:18] that there is a lot of motion blurring
[04:16:20] of course that's the same glitch that we
[04:16:22] have with the black aler trees so select
[04:16:24] all of them and set it to
[04:16:27] movable now there's one last change and
[04:16:30] that is I want to change the color of my
[04:16:31] bark since my bark is pretty white I'd
[04:16:34] rather have that be reddish brownish so
[04:16:38] what I can do is open up the bark
[04:16:39] material instance to change it and we
[04:16:42] can see that this mesh has a lot of
[04:16:44] different materials and one of them is
[04:16:46] the trunk material now if you don't know
[04:16:48] which one is the trunk material you can
[04:16:50] always open up a static mesh and right
[04:16:52] here in material slots select highlight
[04:16:55] to know exactly what material is
[04:16:58] affecting what part of the static mesh
[04:17:00] and we'll see that the material called
[04:17:01] trunk is of course in charge of the
[04:17:04] trunk material so let's open up that
[04:17:06] material instance that I have open right
[04:17:09] here and undock the details panel so we
[04:17:12] can play
[04:17:13] with the colors so for all the way down
[04:17:18] here we have bark tint let's change it
[04:17:21] so that's how it's more Brown I like
[04:17:25] that color so I'm going to keep it and
[04:17:27] we can even make some changes all the
[04:17:29] way up here under bark parameters bring
[04:17:31] this down so that's why my trunk is a
[04:17:33] little bit darker to 0.5 I can also play
[04:17:37] with the wind so let's say if I don't
[04:17:40] like how my bark is swaying back back
[04:17:42] and forth if I come up here it's more
[04:17:44] noticeable you can see how it's going
[04:17:47] back and forth then I can uncheck level
[04:17:49] one wind two wind and three wind but
[04:17:52] then you'll notice that the rest of the
[04:17:54] tree is disconnected since it's still
[04:17:57] relying on the Wind now I can fix that
[04:18:00] by jumping into the leaves here or the
[04:18:03] branches and you'll see that the branch
[04:18:06] parameters are the exact same as the
[04:18:08] trunk since they're all sharing the same
[04:18:10] exact mass of material so go through
[04:18:12] here and uncheck level one wind two wind
[04:18:15] and three
[04:18:16] wind to get rid of wind and I would do
[04:18:20] the same thing for the leaves but I do
[04:18:24] like the wind so I'm going to bring them
[04:18:25] all back I'm just using that as example
[04:18:28] where if you don't want the wind you
[04:18:30] have to remove them from all the
[04:18:32] materials so you make sure that you do
[04:18:34] uncheck them if you are trying to get
[04:18:36] rid of
[04:18:38] wind and I'm going to do the same thing
[04:18:40] right here so open up this materials
[04:18:43] trunk
[04:18:44] instance and bring down brightness to
[04:18:48] 0.5 and give bark tint a reddish dark
[04:18:53] reddish tint like that now I'm going to
[04:18:56] do the same process of changing the
[04:18:58] color for the rest of the trees with
[04:19:00] exposed trunks don't forget to save
[04:19:02] everything now that we have all our
[04:19:04] trees set up let's add them to the
[04:19:06] folage mode so to begin I'm going to
[04:19:08] start with the pine trees so let's go
[04:19:13] select all of these with shift Press
[04:19:17] contrl B to find out where they are in
[04:19:19] the content browser and with those
[04:19:22] selected I can drag them right here into
[04:19:26] the folage editing mode so now I can
[04:19:28] paint them on my landscape but obviously
[04:19:30] we're going to have an issue since we
[04:19:33] paint way too many trees obviously we
[04:19:35] don't want our trees being that dense so
[04:19:38] we need to edit a lot the settings of
[04:19:40] the foliage and keep in mind if you
[04:19:42] don't see any parameters right here make
[04:19:45] sure this button is turned on so it's
[04:19:47] blue now for density bring this from 100
[04:19:50] down to one also paint density up to one
[04:19:54] so let's see what that looks like and
[04:19:56] that is still way too strong so try
[04:20:01] 0.25 and okay we're getting closer but
[04:20:04] that's also still too many trees I don't
[04:20:06] want that many trees so
[04:20:11] 0.01 okay there we go so that looks like
[04:20:13] it's good but you'll see that my trees
[04:20:17] angle to the slope of the landscape and
[04:20:20] obviously trees don't grow like this
[04:20:22] even if a tree is on a sleep steep slope
[04:20:24] it's going to grow Straight Up So within
[04:20:28] the settings right here and actually I'm
[04:20:30] going to increase this to
[04:20:32] 0.05 within the settings align to normal
[04:20:35] make sure that's unchecked so now my
[04:20:37] trees will always grow straight up they
[04:20:39] won't be dependent on the slope of the
[04:20:41] landscape another thing I need to to do
[04:20:43] is that if I zoom in on the
[04:20:44] Wind we still get that little motion
[04:20:48] blurring glitch so with all these
[04:20:50] selected set its Mobility to movable to
[04:20:53] get rid of
[04:20:54] that okay and I also want to make sure
[04:20:57] that our size is correct so let me add
[04:21:00] in a character go into mannequins meshes
[04:21:06] and drag out skm Manny to compare the
[04:21:09] size
[04:21:10] differences so I think
[04:21:13] the trees with their bark exposed are
[04:21:17] too big so select these
[04:21:20] trees right here and for scale X bring
[04:21:25] it down to let's go
[04:21:28] 0.7 to
[04:21:30] 0.8 so now all these trees I have
[04:21:32] selected will be scaled to 70% to 80%
[04:21:36] their original
[04:21:38] size okay that's starting to feel a lot
[04:21:41] better and for
[04:21:43] these really tall trees I want there to
[04:21:44] be less of them than the thick ones so
[04:21:48] this density will be
[04:21:49] 0.01 while the thick trees have the
[04:21:52] density of
[04:21:54] 0.05 great so now we're going to add
[04:21:57] some new trees the black older ones to
[04:22:00] our foliage mode so I'm going to select
[04:22:02] all the black older trees that I want
[04:22:04] we're handling the medium detail so I'm
[04:22:07] going to ignore the really small trees
[04:22:09] for now we are going to add them after
[04:22:11] we handle the really big victories so
[04:22:13] select all the big ones Press contrl B
[04:22:15] to find out where they are in my content
[04:22:17] browser and jump back into Fage mode
[04:22:20] with shift n three and drag them all in
[04:22:23] there now I only want to focus on our
[04:22:26] Mega scan trees so hold down shift and
[04:22:29] select all of our pine trees and uncheck
[04:22:32] them so we don't paint them now we're
[04:22:34] going to start off with the same exact
[04:22:35] issue that we had beforehand and that is
[04:22:38] painted down and okay hopefully unreal
[04:22:40] doesn't crash because I just added in a
[04:22:42] lot of trees right there so bring these
[04:22:45] trees down to a density of
[04:22:48] 0.01 okay that's better and we also have
[04:22:51] that angle problem so go into a line to
[04:22:55] normal uncheck that and we have motion
[04:23:00] bluring once again so with all those
[04:23:02] trees selected sets Mobility to
[04:23:05] movable and that will get rid of it so
[04:23:09] now we can hold on shift and this feels
[04:23:14] a lot
[04:23:15] better so let's see what my paint looks
[04:23:18] like when I have everything so press
[04:23:21] control and a to select all and make
[04:23:24] sure they're all checked so when I'm
[04:23:26] painting I paint both versions of the
[04:23:28] trees I'm testing my paint settings to
[04:23:31] see if we need to make any last changes
[04:23:33] I think I can bring
[04:23:36] down the amount of thick trees from 0.05
[04:23:41] to 0.02
[04:23:43] and again there is no Rhyme or Reason to
[04:23:45] these values that I'm setting these are
[04:23:47] just settings that I think look nice so
[04:23:50] it's entirely up to you since this is
[04:23:51] your world whether or not you want a lot
[04:23:53] of trees or not that many trees and
[04:23:55] because we're using a level of detail
[04:23:58] really performance is a really concern
[04:24:00] with paying down a lot of trees
[04:24:02] especially in the future once we have
[04:24:03] nit trees so those selected Also let's
[04:24:07] do
[04:24:09] 0.005 so even smaller than beforehand
[04:24:13] [Music]
[04:24:14] and uncheck all these just have these
[04:24:18] checked and I
[04:24:20] think these really tall
[04:24:23] trees are way too tall so let's see
[04:24:27] which one is the really tall
[04:24:30] one okay these these two trees right
[04:24:32] here so select both of them and for
[04:24:36] skill ring that down to 0.6 to 0.7 so
[04:24:40] 60% to 70% they original
[04:24:44] height and now I think that's a lot more
[04:24:46] reasonable especially when we compare it
[04:24:49] and we can't see the character so let's
[04:24:51] go select all the Fage and remove it
[04:24:54] especially when we compare the height to
[04:24:56] the mannequin those trees are really
[04:24:59] really
[04:25:00] tall so let's go increase the brush size
[04:25:03] get rid of all that foliage and paint
[04:25:05] foliage again to
[04:25:07] see and okay I think at this point it's
[04:25:12] a good base to go through my landscape
[04:25:15] and start painting in foliage this
[04:25:18] portion of the environment build is
[04:25:19] pretty fun just hold on left Mouse
[04:25:21] button and paint in trees where I want
[04:25:25] to place them and okay one last change
[04:25:29] we need to make the orange trees the
[04:25:31] black Alders are too big in my opinion
[04:25:35] compared to the Pine Tree so hold down
[04:25:38] shift erase all those let's select these
[04:25:41] black alers right here the first three
[04:25:43] and bring down the size to 0.6 to
[04:25:47] 0.72 or
[04:25:49] 0.75
[04:25:51] and okay in my opinion that looks a lot
[04:25:54] better especially if we compare the
[04:25:57] height to the
[04:25:59] mannequin so I think that is pretty
[04:26:02] reasonable size for
[04:26:05] trees now let's go through with a
[04:26:08] paintbrush and start to paint in my
[04:26:10] trees so you could use the paintbrush or
[04:26:13] if you want to get very specific I can
[04:26:15] use the single button right there single
[04:26:18] instance mode instead of selecting all
[04:26:20] selected choose cycle through selected
[04:26:23] now wherever I press it's going to pick
[04:26:26] a random tree to place there if I want
[04:26:29] to get very specific with my tree
[04:26:33] placements so that's another option or I
[04:26:35] can stick with paint so let's decrease
[04:26:38] our brush size and add the trees right
[04:26:40] here and this is a a reminder just
[04:26:43] because we paint our foliage with the
[04:26:45] foliage mode doesn't mean we're limited
[04:26:48] to changing the exact position of a mesh
[04:26:51] so I can use select mode and make sure
[04:26:54] that whatever mesh I want selected has a
[04:26:56] check mark right next to this icon and
[04:26:59] select a tree move it around scale it
[04:27:02] and rotate it as if it's a normal mesh
[04:27:06] so we get a lot of control over our
[04:27:09] foliage and paint down trees especially
[04:27:11] on SP that are noticeable like the tops
[04:27:13] of hills and if I ever don't like the
[04:27:16] placement of a very specific tree I can
[04:27:18] use the select mode and move that tree
[04:27:21] around or if I don't like it completely
[04:27:23] delete
[04:27:24] it now I'm going to repeat that exact
[04:27:26] same process for the rest of my
[04:27:28] landscape so I first use the paintbrush
[04:27:31] to paint in a bunch of trees or I use
[04:27:33] the single brush if I do want precise
[04:27:35] placement for each of my trees and then
[04:27:37] I go through again with a select tool to
[04:27:39] move scale and rotate my trees around
[04:27:42] until I get perfect positioning it is
[04:27:45] that
[04:27:45] simple and here's a tip in case I do
[04:27:48] want to see what my world will look like
[04:27:50] without level of detail since if you do
[04:27:53] decide to render out this world as
[04:27:54] animation then it's going to use the
[04:27:56] most dense level detail possible select
[04:27:59] the console command and once again type
[04:28:01] in folage force LOD and zero now keep in
[04:28:05] mind that your frame rate will
[04:28:07] exponentially drop because now we are
[04:28:10] using the density mesh possible so we no
[04:28:14] longer have lods which makes our world
[04:28:16] look a lot nicer but now our frame rate
[04:28:18] is about 5 to 10 again in the future you
[04:28:21] won't have this issue your trees will
[04:28:23] look really nice with the most detail
[04:28:26] possible since they'll be nanites but
[04:28:28] for now this is our limitations as a
[04:28:31] reminder to reenable level of detail go
[04:28:33] right here and type in folage force L
[04:28:36] and negative 1 to reenable level of
[04:28:39] detail for smooth frame rates
[04:28:42] so I want to point that out because in
[04:28:44] case if you want a really nice shot and
[04:28:46] you don't care about FPS then you can
[04:28:48] set your foliage to zero that way I
[04:28:52] think the placement of my trees are
[04:28:53] pretty good so we're going to take a
[04:28:54] quick break from painting trees and
[04:28:56] there's one change that's not really
[04:28:58] related foliage I do want to add and
[04:29:00] that is to increase the saturation and
[04:29:02] contrast of my world to make my trees
[04:29:04] feel more lively so I need select the
[04:29:06] postprocess volume over
[04:29:08] here and let's go see what our main shot
[04:29:11] looks like by jumping to our bookmark
[04:29:13] with one go into
[04:29:17] Global saturation and
[04:29:20] contrast or contrast change this to 1.02
[04:29:24] let's try
[04:29:25] 1.05 turn it on and off to see what
[04:29:28] difference it makes okay that makes it
[04:29:30] look better and then for saturation
[04:29:32] increase this
[04:29:35] to Also let's try
[04:29:39] 1.05 let's see what our world looks like
[04:29:41] without
[04:29:42] LOD so use full drop force lod0 and in
[04:29:46] case you want to use a console command
[04:29:47] that you used in the past you can use
[04:29:49] the arrow keys on the keyboard to use
[04:29:51] previously used console commands so
[04:29:54] select for
[04:29:56] ld0
[04:29:58] and okay everything is starting to look
[04:30:00] pretty nice so bring back level detail
[04:30:03] with Nega
[04:30:05] -1 Also let's jump back into
[04:30:09] Fage move this off to the side
[04:30:13] [Music]
[04:30:14] and and continue to paint in more
[04:30:18] trees especially on the tops of the
[04:30:21] hills since any trees that are in
[04:30:23] between Hills these trees won't really
[04:30:26] be noticed so it's important that we add
[04:30:28] trees at the very top of the hills where
[04:30:31] the player can actually see something
[04:30:33] since I want the play Space to be this
[04:30:36] area right here and our main cinematic
[04:30:38] shot is at this angle so I'm I'm going
[04:30:42] to prioritize for time the area around
[04:30:44] the lake for extra detail this is just
[04:30:47] what I'm doing if you're doing a
[04:30:48] completely different shot or if you want
[04:30:50] your entire world to be playable then of
[04:30:52] course you'll add more trees that way
[04:30:55] then of course where you're going to
[04:30:56] paint trees and add details will be
[04:30:59] different right now I'm using the select
[04:31:01] tool and moving the trees around I
[04:31:03] especially want to move this tree that's
[04:31:04] in top of the river I notice that we
[04:31:07] have the world grid right here I don't
[04:31:09] like seeing the world grid I don't need
[04:31:11] it so go to show and uncheck its show
[04:31:13] flag to get rid of
[04:31:17] it also using the folder select tool I
[04:31:20] can hold on alt to duplicate
[04:31:22] foliage the only thing I'm doing is
[04:31:24] painting foliage specifically the trees
[04:31:27] and moving them around there is nothing
[04:31:29] special or anything too technical about
[04:31:32] this
[04:31:34] process and it's almost entirely
[04:31:37] artistic the majority of environment
[04:31:39] builds in a real engine is literally
[04:31:42] just moving objects around until you
[04:31:44] find something that you think looks
[04:31:47] nice at this point to get a better sense
[04:31:49] of how the world will feel like in game
[04:31:51] I think it's a good idea to play the
[04:31:53] game I could play my game with alt and P
[04:31:57] as a shortcut and explore my world as a
[04:31:59] third person character as a reminder if
[04:32:02] you play your game and you don't get the
[04:32:04] player character that's because you need
[04:32:06] to go into World settings if you don't
[04:32:08] have World settings come up to Windows
[04:32:10] and select World settings and then under
[04:32:12] game mode game mode override make sure
[04:32:15] you select bpor thir person game mode
[04:32:17] now third person game mode is Right Now
[04:32:20] the default game mode because we did
[04:32:22] start off our project as a third person
[04:32:25] template now if you don't have the third
[04:32:27] person character then you can always go
[04:32:29] to add add feature content packs and
[04:32:33] select third person right there so
[04:32:36] that's just a reminder if you aren't
[04:32:38] getting the third person character as
[04:32:40] our default game mode
[04:32:42] also if you see in the top left hand
[04:32:44] corner this red warning that says
[04:32:45] texture streaming pool over budget then
[04:32:48] you can fix that by exiting out the game
[04:32:50] coming down here into console commands
[04:32:52] and then typing r. streaming. pool size
[04:32:56] and then set it to a large number like
[04:32:59] 10,000 so now if I play my game we no
[04:33:02] longer get that warning so whenever you
[04:33:04] do see that warning go to the console
[04:33:06] commands and then change the pool size
[04:33:08] to something large I tend to just go
[04:33:10] with 10,000
[04:33:12] okay I need to fix these trees right
[04:33:14] here but I do like the scale of the
[04:33:16] environment so
[04:33:18] far so let me fix these by selecting
[04:33:22] both of them and bring them down also I
[04:33:27] need to flatten out this area just a
[04:33:28] little bit within the landscape
[04:33:30] sculpting mode and then paint mud right
[04:33:33] here because it looks like we don't have
[04:33:34] a good transition between the grass and
[04:33:37] water so go to smooth for sculpt
[04:33:42] increase the brush and smooth all of
[04:33:43] this
[04:33:44] out also go into paint now and add in
[04:33:49] the little mud right
[04:33:52] there just like that another thing I'm
[04:33:55] going to do use layer D which is our
[04:33:57] dirt material and create a trail so it's
[04:34:01] almost like there's a trail going in
[04:34:03] between this little Valley around like
[04:34:07] this all the way into the
[04:34:10] Horizon so that's I'm going to do let's
[04:34:12] paint in a
[04:34:14] trail
[04:34:15] and grab the character you see the scale
[04:34:19] of it I'm painting the trail right now
[04:34:22] trying to make sure it's the right size
[04:34:23] relative to our player character and
[04:34:26] then I'm going to have to move the trees
[04:34:27] out of the way and then I notice that
[04:34:30] the little Valley is a little bit too
[04:34:31] small so I'm going to use a sculp brush
[04:34:34] and make the valley even bigger just
[04:34:36] because we're done with large details
[04:34:38] doesn't mean I'm done sculpting the
[04:34:39] landscape there can always be small impr
[04:34:41] ments or entirely new details I can add
[04:34:44] all right so our environment is starting
[04:34:46] to come along really nicely as a
[04:34:48] reminder I can click on fn1 to get a
[04:34:51] full screen view of my world with all my
[04:34:54] windows now docked right here so while
[04:34:57] my environment looks nice it is missing
[04:34:59] one big focal point arguably the most
[04:35:03] important part of the environment since
[04:35:05] it's where our eyes will be drawn to and
[04:35:07] that is the castle so we're going to
[04:35:10] create a castle right here on top of
[04:35:13] this hill and we're also going to add
[04:35:14] castle ruins over here too to just add
[04:35:17] some more interesting visual elements to
[04:35:19] our world and we can see all the assets
[04:35:22] we're going to use to create our Castle
[04:35:24] within the castle asset pack that we
[04:35:27] downloaded go into maps and then select
[04:35:31] overview so here are all the assets
[04:35:34] we're going to put together to make the
[04:35:36] castle and as you can probably guess
[04:35:38] right now by just looking at all the
[04:35:40] pieces our Castle isn't one large single
[04:35:43] mesh instead it's a bunch of different
[04:35:46] smaller meshes that we put together to
[04:35:48] make a larger object as a whole so you
[04:35:50] can essentially think of all these
[04:35:52] different pieces as Lego blocks and
[04:35:54] we're going to stick all the Lego blocks
[04:35:56] together to create an entire Lego set
[04:35:59] and this is actually a very common
[04:36:01] workflow in Unreal Engine 5 it's called
[04:36:04] modular design so for example we can
[04:36:07] take all of these different pieces and
[04:36:10] put them together to create many
[04:36:12] different Castle variations that we can
[04:36:14] see in example castles so here are just
[04:36:18] some ideas that you can pick from when
[04:36:20] creating your castles while all these
[04:36:22] castles are extremely different from
[04:36:24] each other they are all using the same
[04:36:26] exact assets thanks to modular design we
[04:36:30] can see that if I click on this castle
[04:36:32] that they're made up of the same objects
[04:36:34] just positioned differently and that's
[04:36:36] the power of modular design it's going
[04:36:39] to give you the viewer the ability to
[04:36:41] create your own castle completely from
[04:36:43] scratch so I wouldn't recommend that you
[04:36:45] follow One of These Blueprints exactly
[04:36:48] how is try and experiment and create
[04:36:51] your own castle when you are building it
[04:36:53] out or and then this is an option you
[04:36:56] can completely just steal one of the
[04:36:58] castles already built for you so if we
[04:37:01] go into the outliner tab and actually
[04:37:03] let's right click and select undock from
[04:37:06] sidebar scroll up we can see that each
[04:37:11] of these different Castles are contained
[04:37:14] within their own folder so right here is
[04:37:16] our main Castle then castle ruins is
[04:37:18] right here Small Castle is all the way
[04:37:21] over here and Tower Castle is this one
[04:37:24] so let's say for example if I want the
[04:37:26] main Castle I can right click on the
[04:37:29] folder and then go to select and check
[04:37:33] immediate children it's going to select
[04:37:35] all the static meshes that makes up the
[04:37:38] main Castle we can even double check
[04:37:40] that this is the main Castle
[04:37:42] by turning on and off the I icon with
[04:37:45] all the static meshes selected press
[04:37:47] contrl and c and then jump into our main
[04:37:51] environment under Maps Castle
[04:37:53] environment save
[04:37:56] selected and right here contrl V to
[04:38:00] paste the castle into our main
[04:38:01] environment right here now we can move
[04:38:04] this into position on top of the
[04:38:06] hill and simply get it into position
[04:38:10] like this
[04:38:12] so we don't have to create a castle
[04:38:15] completely from scratch we could grab
[04:38:17] one of the pre-built ones but for the
[04:38:19] sake of this tutorial I'm going to go
[04:38:21] through the process of creating an
[04:38:23] original Castle completely from scratch
[04:38:25] so I'm going to delete this and create a
[04:38:27] castle is pretty easy so let's jump into
[04:38:31] Castle assets and meshes and here are
[04:38:34] all the meshes we're going to use so
[04:38:36] first off we need the base of our Castle
[04:38:39] so the front of it which is a wall we
[04:38:41] can use this wall right here so smore
[04:38:45] wall1 is the most simple of assets it is
[04:38:48] simply just one tiled wall that we can
[04:38:50] use and before we continue building out
[04:38:54] my castle we need a human reference to
[04:38:56] help us with scale so jump into
[04:38:58] characters mannequins meshes and we're
[04:39:02] going to use skore Manny to make sure
[04:39:05] our Castle does have the correct scale
[04:39:08] we also have an alternative to this wall
[04:39:10] so press C control MB and this wall I
[04:39:13] slightly like better and that is smore
[04:39:15] wall 07 so this one right here is
[04:39:20] basically just the same wall as this one
[04:39:22] except it has some EXO
[04:39:24] geometry and stones to make it feel more
[04:39:28] three-dimensional so you just place them
[04:39:31] next to each other like
[04:39:33] this that one up a little
[04:39:36] bit and then select both of them hold on
[04:39:39] alt duplicate them to move them up I'm
[04:39:41] going to delete that one and then copy
[04:39:44] this that's how we have Wall 07 just
[04:39:47] like that so that is basically the
[04:39:52] process we're going to be doing so we
[04:39:54] don't have to be super specific we're
[04:39:56] trying to line up our walls especially
[04:39:59] since this is a medieval castle and
[04:40:01] medieval castles are never perfect it
[04:40:03] can always be a little bit off centered
[04:40:06] like right here it doesn't have to be
[04:40:08] completely perfect
[04:40:12] also to prevent repetition I could
[04:40:14] rotate this
[04:40:16] 90° that's how we're using the other
[04:40:18] side of the wall and we're not always
[04:40:20] using the
[04:40:23] front so select these three hold on alt
[04:40:27] and move it up like this so I'm just
[04:40:30] building a pretty big wall right now and
[04:40:33] if I want a wall with a window then I
[04:40:35] could come into here and use smore wall9
[04:40:40] so drag this out and let's delete that
[04:40:42] wall add this wall right there and try
[04:40:47] to rotate it and move it into
[04:40:50] place just like that now you will notice
[04:40:54] that this wall right here has a separate
[04:40:56] material that's a little bit different
[04:40:58] so it does stand out from the rest we
[04:41:01] could change that so select this wall
[04:41:03] and actually let me go undock the
[04:41:05] details panel and the world settings so
[04:41:09] with this selected the details panel I
[04:41:13] want to select this material right here
[04:41:15] so click on the magnifying glass and
[04:41:17] then drag this material onto that wall
[04:41:21] but if you do want to use the original
[04:41:22] material of this wall then you can go
[04:41:25] into Castle assets material and use
[04:41:28] miore wallston blend so this is an
[04:41:32] alternative material that you can use to
[04:41:35] just change the way that it looks that's
[04:41:37] why we're not always using the same
[04:41:38] material we can add some color variation
[04:41:41] to the castle also while we're on the
[04:41:44] subject of materials if we open up any
[04:41:47] of these materials you will see that in
[04:41:49] the details panel we have access to albo
[04:41:52] tint and albo control which function the
[04:41:56] exact same way that they
[04:41:58] do with mega scan assets so these are
[04:42:01] the same parameters if you do want to
[04:42:03] change the way it looks like right now
[04:42:05] but I'm going to uncheck that since I
[04:42:07] want to leave the materials as
[04:42:09] is another wall mesh that I like to use
[04:42:13] press contrl and B to jump to our Castle
[04:42:15] asset meshes is smore
[04:42:18] wall8 so drag that out and this will be
[04:42:22] the top of the
[04:42:24] wall so place that right
[04:42:27] there duplicate that move it there and
[04:42:31] do keep in mind in order to move our
[04:42:33] modular assets around and to make it
[04:42:35] easier for us you want to make sure
[04:42:37] Global is unchecked cuz then we're
[04:42:39] removing the asset relative to the world
[04:42:42] we can't move the object back and forth
[04:42:44] or side to side depending on its
[04:42:46] rotation we need to click this button up
[04:42:49] here to get its local rotation so that
[04:42:52] will help when using modular assets hold
[04:42:56] down alt and move
[04:42:58] that and put all of
[04:43:00] these into place just like that and
[04:43:04] another wall mesh we can use I'm going
[04:43:06] to select this wall mesh and move it
[04:43:09] back is these walls right
[04:43:12] here so wall
[04:43:16] o02 3 and o5 which is good to add
[04:43:21] destroyed elements to our world for
[04:43:24] example right here I can add in wall O2
[04:43:27] like this so that's how it looks like
[04:43:30] this part of the wall has been destroyed
[04:43:33] a little bit so scale that
[04:43:36] up and then to cover the top right there
[04:43:39] I can use this piece
[04:43:42] p and
[04:43:44] then move it like
[04:43:47] this just like that so it's almost like
[04:43:50] someone took a chunk off this wall maybe
[04:43:53] the wall fell off or this Fortress was
[04:43:56] attacked and a cannon hit it so let's go
[04:44:00] work on the sides right now and we can
[04:44:01] do that with entrance large pillar
[04:44:04] 05 which is our traditional Castle
[04:44:06] pillar or
[04:44:08] 03 which is a similar mesh but slightly
[04:44:12] more
[04:44:13] destroyed so with this I can stick this
[04:44:17] to the side right
[04:44:19] here and then I need to extend this down
[04:44:23] so I can use smore entrance large pillar
[04:44:27] o1 which is just a simple
[04:44:30] cylinder and a
[04:44:32] texture so bring that down like this and
[04:44:36] then down again and as a reminder if you
[04:44:38] don't like the material that's currently
[04:44:40] on this pillar
[04:44:41] then we can select miore wall
[04:44:45] stones3 and replace them right there
[04:44:49] like this so another thing we're going
[04:44:51] to do is let's select any of our mches
[04:44:54] press contrl B and alternative is this
[04:44:58] one so smore entrance large pillar
[04:45:01] 07 so this is a great one to add to the
[04:45:05] sides and give some thick weight to our
[04:45:10] Fortress
[04:45:11] right there like that and below that is
[04:45:15] smore entrance pillar
[04:45:18] O2 that we need to add there to extend
[04:45:22] this piece going
[04:45:24] down right there like this and let's
[04:45:26] also make sure that we give the top one
[04:45:29] right here the same material so you can
[04:45:33] see very quickly by using a bunch of
[04:45:35] modular meshes we could create a brand
[04:45:38] new Fort that wasn't just provided to us
[04:45:41] and this is why I love using modular
[04:45:42] assets is because it's literally just
[04:45:45] like playing with Legos where we get a
[04:45:47] bunch of different blocks and from those
[04:45:49] blocks we have a near infinite amount of
[04:45:52] combinations to create whatever we want
[04:45:55] so let's also add a flag right here go
[04:45:58] back into
[04:45:59] meshes and we have this flag I can add
[04:46:02] to the side also I have smore
[04:46:07] flag2 which will be stuck to the walls
[04:46:11] or we have this insanely large flag that
[04:46:15] you could put at the front of your
[04:46:17] castles let's say right
[04:46:18] there but now that is covering that
[04:46:22] detail so I'm going to move this off to
[04:46:26] the side right
[04:46:27] there so that we can still see our
[04:46:32] window after we add the
[04:46:34] flag to the front of the
[04:46:38] castle just like that I can even add
[04:46:42] these smore round
[04:46:45] Stones right there like this to the
[04:46:49] corners of my
[04:46:51] castle before we continue building out
[04:46:53] my castle and keep in mind this is
[04:46:56] completely optional but we can organize
[04:46:58] our Castle into a folder so to create a
[04:47:02] folder go into your outliner tab and at
[04:47:04] the very top right here right click on
[04:47:07] Castle environment or the name of your
[04:47:10] level
[04:47:11] and go create folder now I'm going to
[04:47:13] call this one my castle or you can call
[04:47:15] it whatever you want if you ever want to
[04:47:18] change the name of a folder right click
[04:47:20] go down to edit and then select rename
[04:47:24] now to get assets into a folder you can
[04:47:27] select any of the Assets in the outliner
[04:47:30] hold down the left Mouse button and drag
[04:47:31] it into the folder or you can hold down
[04:47:34] shift and select multiple assets and
[04:47:37] drag those into the folder like that I'm
[04:47:40] going to press control Z since that
[04:47:41] isn't necessary now what I want to do is
[04:47:45] add all these static meshes to my castle
[04:47:48] so go through and select all the static
[04:47:50] meshes that make up the
[04:47:52] castle just like that so I'm going to
[04:47:55] move it around temporarily to make sure
[04:47:57] that I do have all the assets selected
[04:47:58] and I do so now with all them selected I
[04:48:01] could hold down the left Mouse button
[04:48:03] and then try to drag it up into the
[04:48:05] folder but the folder is all the way at
[04:48:08] the top of the outliner so it might be a
[04:48:09] little bit hard or within the outliner I
[04:48:12] can rightclick on any of the selected
[04:48:14] meshes go to move to and select my
[04:48:18] castle to move those assets into that
[04:48:21] folder and now all my assets that make
[04:48:24] up my castle are within this folder so
[04:48:27] that's just one option to organize your
[04:48:29] world of course that is completely
[04:48:31] optional the benefits are that you know
[04:48:34] what assets make up your castle and also
[04:48:36] you can hide and unhide the castle as a
[04:48:38] whole or you can right click select
[04:48:41] immediate children to select all the
[04:48:44] meshes in that
[04:48:45] folder but that is optional and one last
[04:48:49] thing I'm going to do before we go into
[04:48:51] this build and that is I do really like
[04:48:54] our world right now I like the way it
[04:48:56] looks where all the trees are placed the
[04:48:58] water and the beginning of this Castle I
[04:49:01] don't want to lose anything so of course
[04:49:03] we're going to jump into our maps and
[04:49:06] let's duplicate this call this one right
[04:49:09] here Castle backup up
[04:49:13] 03 just like that and let's also save
[04:49:15] everything so we don't lose our progress
[04:49:19] and now let's start to
[04:49:20] build for this portion of the tutorial
[04:49:23] the video is going to be sped up because
[04:49:26] if I didn't time-lapse this portion then
[04:49:28] that would add an extra 30 minutes to
[04:49:30] this video and this tutorial is already
[04:49:33] pretty long now we're not introducing
[04:49:35] any new Concepts whatsoever the only
[04:49:38] thing I'm doing is adding new objects
[04:49:41] into my world moving them around
[04:49:43] rotating scaling maybe even duplicating
[04:49:47] and trying to find combinations of
[04:49:49] pieces that look good together if we
[04:49:51] want to use the Lego analogy again I'm
[04:49:53] just putting bricks together to try to
[04:49:55] create a larger set as a
[04:49:57] whole honestly it's this portion of the
[04:50:00] environment build and Unreal Engine that
[04:50:02] I find to be the most fun where I don't
[04:50:05] have to think of anything technical
[04:50:06] whatsoever I just have to think of what
[04:50:09] looks cool in my environment
[04:50:12] if there wasn't a time constraint I can
[04:50:14] spend hours moving objects around and
[04:50:17] trying to find new compositions and
[04:50:20] looks for the castle notice how I'm also
[04:50:22] changing the lighting just a bit to see
[04:50:25] what my world would look like at
[04:50:27] different times of the day again and
[04:50:29] this is a reminder I highly recommend
[04:50:31] that you don't mirror or copy every
[04:50:34] single mesh placement that I'm doing I
[04:50:36] recommend that you experiment with all
[04:50:38] the assets given and you try to create
[04:50:40] your own asset that's unique to your
[04:50:42] environment if there's any portion of
[04:50:44] this environment build where I would
[04:50:46] suggest that you do something different
[04:50:47] from me it would be right now because
[04:50:50] there's a reason why I chose modular
[04:50:52] assets for this build and that's because
[04:50:55] modular assets allow for an infinite
[04:50:57] number of customizations so everyone
[04:50:59] that follows the tutorial will have a
[04:51:01] different Castle from each other right
[04:51:03] now I'm adding some of the smaller
[04:51:05] details like flags and Green Ivy because
[04:51:08] I really like the way that the ivy looks
[04:51:11] because it helps blend the castle in
[04:51:13] with the environment just a little bit
[04:51:14] more at this point I am completely done
[04:51:17] with my main Castle it looks really nice
[04:51:20] it stands out and it's different from
[04:51:22] the example castles now hopefully you
[04:51:24] didn't follow along with me exactly but
[04:51:27] you created your own version of this
[04:51:28] castle that reflects whatever you were
[04:51:30] trying to go for because again I highly
[04:51:33] recommend that you create a castle since
[04:51:35] it's really good practice now I'm going
[04:51:37] to press F and 10 that's so I can see my
[04:51:40] RO looks like in full screen and I do
[04:51:43] want to make some quick edits to my
[04:51:45] postprocess volume so select it and then
[04:51:48] go into the details panel I think it
[04:51:50] might be a little bit too saturated so
[04:51:52] bring this down to
[04:51:54] 1.01 and for contrast bring that down to
[04:51:58] 1.45 so very actually 1.04 so very very
[04:52:03] small
[04:52:04] changes and exposure it could be a
[04:52:08] little bit brighter not like that
[04:52:11] let's
[04:52:12] [Music]
[04:52:13] try 10.2 yeah I'm going to leave it at
[04:52:16] 10.2 for now so we still haven't built
[04:52:20] my castle ruins so I want to add some
[04:52:23] ruins of a castle or Fortress over to
[04:52:26] the left side of my view to add some
[04:52:29] more detail and I highly recommend that
[04:52:32] you go through all the assets we just
[04:52:34] use maybe even go through quickel bridge
[04:52:37] and find some Castle ruin assets there
[04:52:40] and create your own castle ruins because
[04:52:43] it's really good practice now what I'm
[04:52:45] going to do is cheat right now and go
[04:52:48] into Castle asset Maps example castles
[04:52:52] and Ste the castle ruins right here so
[04:52:55] go to
[04:52:57] outliner and select castle ruins right
[04:53:00] click select immediate children contrl C
[04:53:04] all of these to copy and then jump into
[04:53:08] your Maps Castle environments and then
[04:53:12] contrl + V to paste it
[04:53:14] in so all of them are right here going
[04:53:17] to move it to this location to the left
[04:53:22] now I wouldn't recommend that you do
[04:53:24] that instead as practice create your own
[04:53:26] castle I just decided to cheat to save
[04:53:29] time now we've handled the really large
[04:53:32] details which is our Mountains and the
[04:53:34] landscape then we hand on to medium
[04:53:36] details which is the cliffs trees and
[04:53:40] and the castles and finally it's on to
[04:53:42] the super small details which is our
[04:53:45] Pebbles rocks twigs and shrubs so where
[04:53:49] are we going to get these assets you
[04:53:51] probably guessed right and that is
[04:53:54] within quick soulle Bridge I've already
[04:53:57] gone ahead and downloaded a lot of the
[04:53:59] assets I want to use under favorites so
[04:54:02] I want to use this tree stump add to my
[04:54:05] project this rock right here and also
[04:54:08] this rock
[04:54:10] and scroll down of course we want
[04:54:13] vegetation so Violet wood use that and
[04:54:17] this is my favorite Grass Grass clumps
[04:54:21] add that to your project
[04:54:24] ferns white
[04:54:26] flowers and I really like is atantic
[04:54:29] terrain it's one of my favorite meshes
[04:54:30] in quicko Bridge so of course I want to
[04:54:33] add that the forest Roots
[04:54:37] Pebbles and common fern and some more
[04:54:41] branches and broken trees so that's
[04:54:44] basically all the assets I'm going to
[04:54:46] use for this tutorial of course there is
[04:54:49] 14,000 assets within quicksell Bridge
[04:54:52] feel free to find your own meshes that
[04:54:54] you like and add to your project but
[04:54:57] these are the meshes I'm going to use
[04:54:58] for now and here we have a bunch of new
[04:55:01] static meshes in the mega scans
[04:55:04] folder so I'm going to start off by
[04:55:07] placing some of the large assets like
[04:55:10] the wood rocks and boulders to help vary
[04:55:13] up the landscape because otherwise it'll
[04:55:15] just be a flat landscape I want to add
[04:55:17] some small height variation to it since
[04:55:19] the Landscapes of real life are normally
[04:55:21] never this smooth it's also never too
[04:55:23] late to add in new trees and shrubs now
[04:55:26] that we handled the boulders let's start
[04:55:29] painting down our foliage and sometimes
[04:55:31] when you import assets from quickel
[04:55:33] bridge they will automatically be added
[04:55:35] to our foliage so we didn't have to go
[04:55:38] where grass clumps are and then select
[04:55:41] them and drag them in they were
[04:55:42] automatically added because quickel
[04:55:44] bridge is smart enough but we're still
[04:55:46] missing some assets that I want to use
[04:55:48] and that is the small meshes from our
[04:55:51] interactive Spruce Forest so go there
[04:55:54] into meshes small and let's use the last
[04:55:58] four and drag that on like
[04:56:01] that whenever I have new static meshes
[04:56:04] in the fge tool I first do a couple of
[04:56:06] test paints to make sure that the
[04:56:08] settings are correct before I paint it
[04:56:09] like normal
[04:56:11] all right so now that those are painted
[04:56:14] let's start painting our grass and we'll
[04:56:18] see that our grass is way too bright so
[04:56:23] let's go find where grass is and open up
[04:56:25] its material
[04:56:27] instance so we have this material
[04:56:29] instance right
[04:56:30] here
[04:56:32] and or color overlay Marina it down to
[04:56:36] something darker and also decreases
[04:56:39] translucent strength to
[04:56:43] four okay so there we go so that is a
[04:56:45] lot
[04:56:46] better maybe
[04:56:48] even five so we're going to leave it
[04:56:51] like that but when I go away we still
[04:56:55] transition into the lowest LOD which
[04:56:58] looks different and that's because it's
[04:57:00] using a different material which is
[04:57:02] right here so this material controls the
[04:57:05] lowest L we need to make the same
[04:57:07] changes so that is bringing down its
[04:57:09] color to something a lot darker and then
[04:57:12] bring down translucency to
[04:57:15] four so there we go so now the
[04:57:17] transition is much more natural in
[04:57:20] between the
[04:57:21] lods so let's start painting down our
[04:57:25] grass now I'm only going to paint
[04:57:27] foliage and detail this specific area
[04:57:30] that is next to the trail the reason why
[04:57:32] is because this is going to be our main
[04:57:34] playable space now if the player
[04:57:36] character can walk around our entire map
[04:57:38] then I would go through the entire map
[04:57:40] and detail the landscape and paint
[04:57:42] foliage but obviously that would take up
[04:57:45] a lot of time and it's the same exact
[04:57:47] process as what I'm doing right now
[04:57:50] notice how for a lot of folage I'm doing
[04:57:52] the same exact thing we did for the
[04:57:53] grass and that is decrease its color
[04:57:56] because by default I think Mega scan
[04:57:58] Fage is a little bit too bright I want
[04:58:00] to point out that just because we have
[04:58:01] folder static meshes like grass doesn't
[04:58:04] mean we have to place it through the
[04:58:05] folge mode I can still like any static
[04:58:08] mesh simply drag the grass out out from
[04:58:10] the content browser and place it like
[04:58:12] normal and finally at the end right here
[04:58:15] I'm adding rocks to the shore and twigs
[04:58:17] to the path and as a reminder for those
[04:58:20] assets you can also enable nanites to
[04:58:22] increase performance I'm also adding
[04:58:25] ferns to the top of my Cliffs because it
[04:58:27] doesn't make sense that there wouldn't
[04:58:29] be any folge growing there all right I
[04:58:32] am almost done with this environment
[04:58:34] there's just one last change I want to
[04:58:35] make and that is these trees in my
[04:58:38] opinion are way too Brown
[04:58:40] I want to make them yellow so since they
[04:58:42] Mega scan trees we can control them with
[04:58:44] the global F actor so select that and
[04:58:48] then within the details panel let's open
[04:58:50] that up and increase the season strength
[04:58:54] and the season brightness to somewhere
[04:58:57] around
[04:58:58] 1.5 and
[04:59:00] saturation decrease that just a little
[04:59:03] bit since I think it was too saturated
[04:59:05] and it was making the trees more red
[04:59:07] than yellow and I want to leave them at
[04:59:09] yellow and with that I'd say we are
[04:59:12] pretty much done with the environment so
[04:59:15] if you have followed along throughout
[04:59:16] this entire tutorial pat yourself on the
[04:59:18] back since this was a lot of work now I
[04:59:21] can press alt and P and then run around
[04:59:24] my world as my character it is a very
[04:59:27] satisfying and fun feeling to finally be
[04:59:29] able to play your environment and world
[04:59:31] as if it's an actual game and explore
[04:59:34] everything you created well I guess now
[04:59:37] this is the end of the video I hope you
[04:59:39] got something out of it and if you did
[04:59:40] make sure to subscribe because I have a
[04:59:43] lot more free assets and tutorials
[04:59:45] planned for this channel also if you did
[04:59:48] follow along and you create an
[04:59:49] environment I would love to see what you
[04:59:51] made so make sure to share it in the
[04:59:54] comment sections below now with all that
[04:59:56] being said I guess this is goodbye