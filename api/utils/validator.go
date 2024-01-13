package utils

import (
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type Validator struct {
	validator *validator.Validate
}

func (v *Validator) Validate(i interface{}) error {

	if err := v.validator.Struct(i); err != nil {
		var errorMap []map[string]string

		for _, err := range err.(validator.ValidationErrors) {

			errMessage := "The field '%s' failed the '%s' validation"
			formattedErrMessage := fmt.Sprintf(errMessage, err.Field(), err.Tag())

			errorMap = append(errorMap, map[string]string{
				"field": err.Field(),
				"error": formattedErrMessage,
			})
		}

		return echo.NewHTTPError(http.StatusBadRequest, Error{
			Message: "Malformed request payload!",
			Code:    ValidationError,
			Details: errorMap,
		})
	}
	return nil
}

func NewValidator() *Validator {
	return &Validator{
		validator: validator.New(
			validator.WithRequiredStructEnabled(),
		),
	}
}

func BindAndValidate(c echo.Context, i interface{}) error {
	if err := c.Bind(i); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, Error{
			Message: "Malformed request payload!",
			Code:    MalformedJSON,
			Details: "The request payload is not a valid JSON.",
		})
	}

	if err := c.Validate(i); err != nil {
		return err
	}

	return nil
}
