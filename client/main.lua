local isCharacterSelectorActive = false
local currentCharacter = nil
local camera = nil

-- Initialize the character selector
function InitCharacterSelector()
    -- Hide the default GTA HUD
    DisplayRadar(false)
    SetEntityVisible(PlayerPedId(), false)
    SetEntityInvincible(PlayerPedId(), true)
    FreezeEntityPosition(PlayerPedId(), true)
    
    -- Set the player to the spawn point
    local spawnPoint = Config.SpawnPoint
    RequestCollisionAtCoord(spawnPoint.x, spawnPoint.y, spawnPoint.z)
    SetEntityCoords(PlayerPedId(), spawnPoint.x, spawnPoint.y, spawnPoint.z, false, false, false, true)
    
    -- Create the camera
    CreateCamera()
    
    -- Load the UI
    SendNUIMessage({
        type = 'SET_VISIBLE',
        visible = true
    })
    SetNuiFocus(true, true)
    
    isCharacterSelectorActive = true
end

-- Create the camera for character preview
function CreateCamera()
    if not DoesCamExist(camera) then
        camera = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
        SetCamActive(camera, true)
        RenderScriptCams(true, false, 1, true, true)
        SetCamParams(camera, Config.Camera.position.x, Config.Camera.position.y, Config.Camera.position.z, 0.0, 0.0, 0.0, Config.Camera.fov, 0, 0, 2, 0, 2)
    end
end

-- Clean up resources
function CleanupCharacterSelector()
    if DoesCamExist(camera) then
        RenderScriptCams(false, false, 0, true, true)
        DestroyCam(camera, false)
        camera = nil
    end
    
    SetNuiFocus(false, false)
    isCharacterSelectorActive = false
end

-- NUI Callbacks
RegisterNUICallback('selectCharacter', function(data, cb)
    -- Handle character selection
    local characterId = data.characterId
    -- TODO: Load character data and spawn the player
    cb({ success = true })
end)

RegisterNUICallback('createNewCharacter', function(data, cb)
    -- Handle new character creation
    -- TODO: Create new character with the provided data
    cb({ success = true })
end)

RegisterNUICallback('deleteCharacter', function(data, cb)
    -- Handle character deletion
    local characterId = data.characterId
    -- TODO: Delete character logic
    cb({ success = true })
end)

-- Command to open the character selector (for testing)
RegisterCommand('charselect', function()
    if not isCharacterSelectorActive then
        InitCharacterSelector()
    end
end, false)

-- Event handlers
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    
    -- Initialize the character selector when the resource starts
    -- In a real scenario, you might want to check if the player is already logged in
    Citizen.SetTimeout(1000, function()
        InitCharacterSelector()
    end)
end)

AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    
    -- Clean up resources when the resource stops
    CleanupCharacterSelector()
end)
