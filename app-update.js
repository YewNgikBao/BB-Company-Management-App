// ========================================
// BB COMPANY MANAGEMENT APP
// AUTO UPDATE SYSTEM
// ========================================

// ========================================
// REGISTER SERVICE WORKER
// ========================================

async function registerServiceWorker(){

    if(!("serviceWorker" in navigator)){

        console.log(
            "Service Worker is not supported."
        );

        return;

    }

    try{

        const registration =
            await navigator.serviceWorker.register(
                "./service-worker.js"
            );

        console.log(
            "Service Worker registered:",
            registration.scope
        );

    }
    catch(error){

        console.error(
            "Service Worker registration failed:",
            error
        );

    }

}


// ========================================
// CHECK APP VERSION
// ========================================

async function checkAppUpdate(){

    try{

        const response =
            await fetch(
                "version.json?t=" + Date.now(),
                {
                    cache:"no-store"
                }
            );


        if(!response.ok){

            console.log(
                "Cannot find version.json"
            );

            return;

        }


        const versionData =
            await response.json();


        const latestVersion =
            versionData.version;


        if(!latestVersion){

            console.log(
                "version.json has no version number"
            );

            return;

        }


        // ========================================
        // GET INSTALLED VERSION
        // ========================================

        let installedVersion =
            localStorage.getItem(
                "bbAppVersion"
            );


        // ========================================
        // FIRST INSTALL
        // ========================================

        if(!installedVersion){

            localStorage.setItem(
                "bbAppVersion",
                latestVersion
            );

            console.log(
                "BB App first version:",
                latestVersion
            );

            return;

        }


        console.log(
            "Installed Version:",
            installedVersion
        );

        console.log(
            "Latest Version:",
            latestVersion
        );


        // ========================================
        // CHECK UPDATE
        // ========================================

        if(
            installedVersion !==
            latestVersion
        ){

            showUpdatePopup(
                latestVersion,
                versionData.message
            );

        }

    }
    catch(error){

        console.error(
            "Update check failed:",
            error
        );

    }

}


// ========================================
// SHOW UPDATE POPUP
// ========================================

function showUpdatePopup(
    latestVersion,
    message
){

    if(
        document.getElementById(
            "appUpdatePopup"
        )
    ){

        return;

    }


    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "appUpdatePopup";


    popup.innerHTML = `

        <div class="update-overlay">

            <div class="update-box">

                <div class="update-icon">

                    <i class="fa-solid fa-cloud-arrow-down"></i>

                </div>


                <h2>
                    New Update Available
                </h2>


                <p>
                    A new version of
                    BB Company Management App
                    is available.
                </p>


                <p class="update-version">

                    Version ${latestVersion}

                </p>


                <div class="update-message">

                    ${
                        message ||
                        "Please update the app to get the latest features and improvements."
                    }

                </div>


                <button
                    class="update-now"
                    onclick="updateApp('${latestVersion}')"
                >

                    <i class="fa-solid fa-rotate"></i>

                    Update Now

                </button>


                <button
                    class="update-later"
                    onclick="closeUpdatePopup()"
                >

                    Later

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    addUpdateStyles();

}


// ========================================
// UPDATE APP
// ========================================

window.updateApp = async function(
    latestVersion
){

    try{

        const button =
            document.querySelector(
                ".update-now"
            );


        if(button){

            button.innerHTML = `

                <i class="fa-solid fa-spinner fa-spin"></i>

                Updating...

            `;

            button.disabled = true;

        }


        // ========================================
        // UPDATE VERSION
        // ========================================

        localStorage.setItem(
            "bbAppVersion",
            latestVersion
        );


        // ========================================
        // UPDATE SERVICE WORKER
        // ========================================

        if(
            "serviceWorker" in navigator
        ){

            const registration =
                await navigator
                    .serviceWorker
                    .getRegistration();


            if(registration){

                await registration.update();

            }

        }


        // ========================================
        // CLEAR CACHE
        // ========================================

        if(
            "caches" in window
        ){

            const cacheNames =
                await caches.keys();


            await Promise.all(

                cacheNames.map(
                    cacheName =>
                        caches.delete(
                            cacheName
                        )
                )

            );

        }


        // ========================================
        // RELOAD
        // ========================================

        setTimeout(
            function(){

                window.location.reload();

            },
            800
        );

    }
    catch(error){

        console.error(
            "Update error:",
            error
        );


        window.location.reload();

    }

};


// ========================================
// CLOSE UPDATE POPUP
// ========================================

window.closeUpdatePopup =
function(){

    const popup =
        document.getElementById(
            "appUpdatePopup"
        );


    if(popup){

        popup.remove();

    }

};


// ========================================
// UPDATE POPUP STYLE
// ========================================

function addUpdateStyles(){

    if(
        document.getElementById(
            "updateStyles"
        )
    ){

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "updateStyles";


    style.innerHTML = `

        .update-overlay{

            position:fixed;

            top:0;
            left:0;

            width:100%;
            height:100%;

            background:
                rgba(0,0,0,0.55);

            display:flex;

            align-items:center;
            justify-content:center;

            z-index:999999;

            padding:20px;

            box-sizing:border-box;

        }


        .update-box{

            width:90%;

            max-width:380px;

            background:white;

            border-radius:25px;

            padding:30px 25px;

            text-align:center;

            box-shadow:
                0 10px 40px
                rgba(0,0,0,0.3);

            animation:
                updatePopupIn
                0.25s ease;

        }


        .update-icon{

            width:70px;
            height:70px;

            margin:
                0 auto 15px;

            border-radius:50%;

            background:#081f63;

            color:white;

            display:flex;

            align-items:center;
            justify-content:center;

            font-size:32px;

        }


        .update-box h2{

            margin:10px 0;

            color:#081f63;

            font-size:24px;

        }


        .update-box p{

            color:#666;

            line-height:1.5;

            font-size:16px;

        }


        .update-version{

            font-weight:bold;

            color:#081f63 !important;

        }


        .update-message{

            background:#f1f4fb;

            padding:12px;

            border-radius:12px;

            margin:15px 0;

            color:#555;

            font-size:14px;

        }


        .update-now{

            width:100%;

            border:none;

            border-radius:15px;

            padding:15px;

            background:#081f63;

            color:white;

            font-size:18px;

            font-weight:bold;

            cursor:pointer;

        }


        .update-now:disabled{

            opacity:0.7;

        }


        .update-later{

            width:100%;

            border:none;

            background:none;

            padding:12px;

            margin-top:5px;

            font-size:16px;

            color:#777;

            cursor:pointer;

        }


        @keyframes updatePopupIn{

            from{

                transform:scale(0.85);

                opacity:0;

            }

            to{

                transform:scale(1);

                opacity:1;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


// ========================================
// START
// ========================================

window.addEventListener(
    "load",
    function(){

        // Register Service Worker
        registerServiceWorker();


        // Check version
        setTimeout(
            checkAppUpdate,
            1500
        );

    }
);