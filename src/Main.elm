module Main exposing (..)

import Browser
import Browser.Events exposing (onAnimationFrameDelta)
import Html exposing (Html, div, pre, text)
import Http


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type HttpClientModel
    = Loading
    | Success String
    | Failure


type alias Model =
    { httpClient : HttpClientModel
    , elapsedTime : Float
    }


init : () -> ( Model, Cmd Msg )
init () =
    ( { httpClient = Loading
      , elapsedTime = 0
      }
    , Http.get
        { url = "https://elm-lang.org/assets/public-opinion.txt"
        , expect = Http.expectString GotText
        }
    )


type Msg
    = GotText (Result Http.Error String)
    | Tick Float


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotText result ->
            case result of
                Ok fullText ->
                    ( { model | httpClient = Success fullText }, Cmd.none )

                Err _ ->
                    ( { model | httpClient = Failure }, Cmd.none )

        Tick time ->
            ( { model | elapsedTime = model.elapsedTime + time }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    onAnimationFrameDelta Tick


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text (String.fromFloat model.elapsedTime) ]
        , div []
            [ case model.httpClient of
                Loading ->
                    text "Loading..."

                Success fullText ->
                    pre [] [ text fullText ]

                Failure ->
                    text "Failed to load your book"
            ]
        ]
